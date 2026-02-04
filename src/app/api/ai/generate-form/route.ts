/**
 * AI Form Generator API Route
 * Generates form schemas from natural language descriptions
 * Works with both structured output (OpenAI/Google) and text parsing (Ollama)
 * Includes credit tracking for authenticated users
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';
import { getModel, isAIConfigured, getConfiguredProvider } from '@/lib/ai/provider';
import {
  generatedFormSchema,
  FORM_GENERATOR_SYSTEM_PROMPT,
  type GeneratedForm,
} from '@/lib/ai/schemas';
import { auth } from '@/lib/auth';
import { hasCredits, deductCredits, CREDIT_COSTS } from '@/lib/credits';

// Request schema
const requestSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
});

// Example JSON for the prompt (helps Ollama understand the format)
const EXAMPLE_JSON = `{
  "name": "ContactForm",
  "description": "A simple contact form",
  "fields": [
    {
      "name": "fullName",
      "label": "Full Name",
      "type": "text",
      "placeholder": "Enter your name",
      "required": true
    },
    {
      "name": "email",
      "label": "Email Address",
      "type": "email",
      "placeholder": "you@example.com",
      "required": true
    }
  ],
  "submitLabel": "Send Message"
}`;

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Require authentication to prevent API cost abuse
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required to use AI features' },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    // Check if AI is configured
    if (!isAIConfigured()) {
      return NextResponse.json(
        {
          error: 'AI not configured',
          message:
            'Set OLLAMA_ENABLED=true, OPENAI_API_KEY, or GOOGLE_AI_API_KEY in your environment',
        },
        { status: 503 }
      );
    }

    // Check credits before processing
    const creditCost = CREDIT_COSTS.FORM_GENERATION;
    const hasEnoughCredits = await hasCredits(userId, creditCost);
    if (!hasEnoughCredits) {
      return NextResponse.json(
        {
          error: 'Insufficient credits',
          code: 'INSUFFICIENT_CREDITS',
          message: `This operation requires ${creditCost} credits. Please upgrade your plan or wait for your monthly refill.`,
        },
        { status: 402 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { prompt } = result.data;
    const provider = getConfiguredProvider();

    let formSchema: GeneratedForm;

    // Use structured output for OpenAI/Google, text parsing for Ollama
    if (provider === 'ollama') {
      // Ollama doesn't support structured outputs well, use text generation with JSON parsing
      const { text } = await generateText({
        model: getModel(),
        system: `${FORM_GENERATOR_SYSTEM_PROMPT}

IMPORTANT: You must respond with ONLY valid JSON, no other text. No markdown code blocks.

Here is an example of the exact JSON format you must use:
${EXAMPLE_JSON}

Field types can be: text, email, password, number, tel, url, textarea, select, checkbox, radio, date, time, datetime, file

For select/radio fields, include an "options" array with objects containing "value" and "label".`,
        prompt: `Generate a form schema for: ${prompt}

Respond with ONLY the JSON object, nothing else.`,
      });

      // Parse the JSON response
      try {
        // Clean up the response (remove markdown code blocks if present)
        let cleanedText = text.trim();
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText.slice(7);
        } else if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.slice(3);
        }
        if (cleanedText.endsWith('```')) {
          cleanedText = cleanedText.slice(0, -3);
        }
        cleanedText = cleanedText.trim();

        const parsed = JSON.parse(cleanedText);
        const validated = generatedFormSchema.safeParse(parsed);

        if (!validated.success) {
          console.error('Validation error:', validated.error);
          return NextResponse.json(
            {
              error: 'Invalid form structure',
              message: 'The AI generated an invalid form structure. Please try again.',
              details: validated.error.flatten(),
            },
            { status: 422 }
          );
        }

        formSchema = validated.data;
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Text:', text);
        return NextResponse.json(
          {
            error: 'Failed to parse AI response',
            message: 'The AI did not return valid JSON. Please try again with a simpler prompt.',
          },
          { status: 422 }
        );
      }
    } else {
      // Use structured output for OpenAI/Google
      const { object } = await generateObject({
        model: getModel(),
        schema: generatedFormSchema,
        system: FORM_GENERATOR_SYSTEM_PROMPT,
        prompt: `Generate a form schema for: ${prompt}`,
      });
      formSchema = object;
    }

    // Deduct credits after successful generation
    await deductCredits(userId, creditCost, {
      description: 'Form generation',
      endpoint: '/api/ai/generate-form',
      metadata: { prompt: prompt.slice(0, 100) }, // Store first 100 chars of prompt
    });

    return NextResponse.json({
      success: true,
      form: formSchema,
      creditsUsed: creditCost,
    });
  } catch (error) {
    console.error('Form generation error:', error);

    // Handle specific AI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'AI configuration error', message: error.message },
          { status: 503 }
        );
      }
      if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')) {
        return NextResponse.json(
          {
            error: 'AI service unavailable',
            message: 'Could not connect to AI service. Make sure Ollama is running: ollama serve',
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Failed to generate form',
        message: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

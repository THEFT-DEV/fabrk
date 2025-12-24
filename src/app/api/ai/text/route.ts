/**
 * AI Text Tools API Route
 * Text transformation operations: summarize, rewrite, translate, expand, grammar
 */

import { generateText } from 'ai';
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { getModel, isAIConfigured } from '@/lib/ai';

export type TextOperation = 'summarize' | 'rewrite' | 'translate' | 'expand' | 'grammar' | 'tone';

interface TextRequest {
  text: string;
  operation: TextOperation;
  options?: {
    targetLanguage?: string; // For translate
    tone?: 'professional' | 'casual' | 'formal' | 'friendly'; // For tone
    length?: 'shorter' | 'same' | 'longer'; // For rewrite
  };
}

const operationPrompts: Record<
  TextOperation,
  (text: string, options?: TextRequest['options']) => string
> = {
  summarize: (text) =>
    `Summarize the following text concisely while keeping the key points:\n\n${text}`,

  rewrite: (text, options) => {
    const lengthInstruction =
      options?.length === 'shorter'
        ? 'Make it more concise.'
        : options?.length === 'longer'
          ? 'Expand on the ideas with more detail.'
          : '';
    return `Rewrite the following text to improve clarity and flow. ${lengthInstruction}\n\n${text}`;
  },

  translate: (text, options) => {
    const target = options?.targetLanguage || 'Spanish';
    return `Translate the following text to ${target}. Maintain the tone and meaning:\n\n${text}`;
  },

  expand: (text) =>
    `Expand on the following text with more detail, examples, and explanation:\n\n${text}`,

  grammar: (text) =>
    `Fix any grammar, spelling, and punctuation errors in the following text. Keep the original meaning and style:\n\n${text}`,

  tone: (text, options) => {
    const tone = options?.tone || 'professional';
    return `Rewrite the following text in a ${tone} tone while keeping the same meaning:\n\n${text}`;
  },
};

export async function POST(req: NextRequest) {
  try {
    // Check if AI is configured
    if (!isAIConfigured()) {
      return Response.json(
        {
          error: 'AI not configured',
          message:
            'No AI provider configured. Set OPENAI_API_KEY, GOOGLE_AI_API_KEY, or OLLAMA_ENABLED.',
        },
        { status: 503 }
      );
    }

    // Get session (optional)
    const session = await auth();
    const _userId = session?.user?.id;

    // Parse request body
    const { text, operation, options }: TextRequest = await req.json();

    if (!text || typeof text !== 'string') {
      return Response.json(
        { error: 'Invalid request', message: 'text is required' },
        { status: 400 }
      );
    }

    if (!operation || !operationPrompts[operation]) {
      return Response.json(
        {
          error: 'Invalid request',
          message:
            'Valid operation is required: summarize, rewrite, translate, expand, grammar, tone',
        },
        { status: 400 }
      );
    }

    // Optional: Check credits
    /*
    if (userId) {
      const { hasCredits, CREDIT_COSTS } = await import('@/lib/credits');
      const hasEnough = await hasCredits(userId, CREDIT_COSTS.TEXT_OPERATION || 2);
      if (!hasEnough) {
        return Response.json(
          { error: 'Insufficient credits', code: 'INSUFFICIENT_CREDITS' },
          { status: 402 }
        );
      }
    }
    */

    // Generate the prompt
    const prompt = operationPrompts[operation](text, options);

    // Generate response
    const { text: result } = await generateText({
      model: getModel(),
      prompt,
      system:
        'You are a helpful writing assistant. Respond only with the transformed text, no explanations or preamble.',
    });

    // Optional: Deduct credits
    /*
    if (userId) {
      const { deductCredits, CREDIT_COSTS } = await import('@/lib/credits');
      await deductCredits(userId, CREDIT_COSTS.TEXT_OPERATION || 2, {
        description: `Text ${operation}`,
        endpoint: '/api/ai/text',
      });
    }
    */

    return Response.json({
      result,
      operation,
      originalLength: text.length,
      resultLength: result.length,
    });
  } catch (error) {
    console.error('[AI Text Error]:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return Response.json(
          { error: 'Configuration error', message: 'AI provider API key is invalid or missing' },
          { status: 503 }
        );
      }
    }

    return Response.json(
      { error: 'Internal error', message: 'Failed to process text request' },
      { status: 500 }
    );
  }
}

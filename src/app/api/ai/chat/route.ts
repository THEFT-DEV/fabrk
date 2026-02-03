/**
 * AI Chat API Route
 * Streaming chat completions with multi-provider support
 * Integrates with AI Credits system for usage tracking
 */

import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { getModel, isAIConfigured } from '@/lib/ai';
import { hasCredits, deductCredits, CREDIT_COSTS } from '@/lib/credits';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

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

    // SECURITY: Require authentication to prevent API cost abuse
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { error: 'Unauthorized', message: 'Authentication required to use AI features' },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    // Parse request body
    const { messages, systemPrompt } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: 'Invalid request', message: 'messages array is required' },
        { status: 400 }
      );
    }

    // Check credits before processing
    const hasEnough = await hasCredits(userId, CREDIT_COSTS.CHAT_MESSAGE);
    if (!hasEnough) {
      return Response.json(
        { error: 'Insufficient credits', code: 'INSUFFICIENT_CREDITS' },
        { status: 402 }
      );
    }

    // Default system prompt for Fabrk assistant
    const defaultSystemPrompt = `You are a helpful AI assistant. You provide clear, concise, and accurate responses.
When writing code, use proper formatting and include comments where helpful.
Be direct and professional in your responses.`;

    // Stream the response
    const result = streamText({
      model: getModel(),
      system: systemPrompt || defaultSystemPrompt,
      messages,
    });

    // Deduct credits for the chat message
    // Note: For streaming, credits are deducted upfront
    await deductCredits(userId, CREDIT_COSTS.CHAT_MESSAGE, {
      description: 'Chat message',
      endpoint: '/api/ai/chat',
    });

    // Return streaming response
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[AI Chat Error]:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return Response.json(
          { error: 'Configuration error', message: 'AI provider API key is invalid or missing' },
          { status: 503 }
        );
      }
      if (error.message.includes('rate limit')) {
        return Response.json(
          { error: 'Rate limited', message: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return Response.json(
      { error: 'Internal error', message: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

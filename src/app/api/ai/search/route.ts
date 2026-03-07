/**
 * AI Search API Route
 * Web search + AI synthesis endpoint
 */

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { isAIConfigured } from '@/lib/ai';
import { hasCredits, deductCredits, CREDIT_COSTS } from '@/lib/credits';
import { executeSearchQuery, type SearchOptions } from '@/lib/ai/handlers/search';

const searchRequestSchema = z.object({
  query: z.string().min(1, 'query is required').max(2000),
  context: z.string().max(5000).optional(),
  maxResults: z.number().int().min(1).max(20).optional(),
});

export async function POST(req: NextRequest): Promise<Response> {
  try {
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

    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { error: 'Unauthorized', message: 'Authentication required to use AI features' },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    const parsed = searchRequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid request', message: parsed.error.issues[0]?.message },
        { status: 400 }
      );
    }

    const { query, context, maxResults } = parsed.data;

    const hasEnough = await hasCredits(userId, CREDIT_COSTS.TEXT_OPERATION);
    if (!hasEnough) {
      return Response.json(
        { error: 'Insufficient credits', code: 'INSUFFICIENT_CREDITS' },
        { status: 402 }
      );
    }

    const searchOptions: SearchOptions = {
      query,
      context,
      maxResults,
      userId,
      feature: 'search',
    };

    const result = await executeSearchQuery(searchOptions);

    await deductCredits(userId, CREDIT_COSTS.TEXT_OPERATION, {
      description: 'AI search',
      endpoint: '/api/ai/search',
    });

    return Response.json(result);
  } catch (error) {
    console.error('[AI Search Error]:', error);

    if (error instanceof Error && error.message.includes('API key')) {
      return Response.json(
        { error: 'Configuration error', message: 'AI provider API key is invalid or missing' },
        { status: 503 }
      );
    }

    return Response.json(
      { error: 'Internal error', message: 'Failed to process search request' },
      { status: 500 }
    );
  }
}

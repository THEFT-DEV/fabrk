/**
 * AI Text-to-Speech API Route
 * Generate speech from text using OpenAI TTS
 */

import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { textToSpeech } from '@/lib/ai';
import { hasCredits, deductCredits, CREDIT_COSTS } from '@/lib/credits';

// Available voices
const VOICES = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'] as const;
type Voice = (typeof VOICES)[number];

// Available models
const _MODELS = ['tts-1', 'tts-1-hd'] as const;
type Model = (typeof _MODELS)[number];

interface TTSRequest {
  text: string;
  voice?: Voice;
  model?: Model;
}

export async function POST(req: NextRequest) {
  try {
    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          error: 'Text-to-speech not configured',
          message: 'OPENAI_API_KEY is required for speech synthesis.',
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
    const { text, voice = 'alloy', model = 'tts-1' }: TTSRequest = await req.json();

    if (!text || typeof text !== 'string') {
      return Response.json(
        { error: 'Invalid request', message: 'text is required' },
        { status: 400 }
      );
    }

    if (text.length > 4096) {
      return Response.json(
        { error: 'Invalid request', message: 'text must be 4096 characters or less' },
        { status: 400 }
      );
    }

    if (!VOICES.includes(voice)) {
      return Response.json(
        { error: 'Invalid request', message: `voice must be one of: ${VOICES.join(', ')}` },
        { status: 400 }
      );
    }

    // Check credits before processing
    const hasEnough = await hasCredits(userId, CREDIT_COSTS.TEXT_TO_SPEECH);
    if (!hasEnough) {
      return Response.json(
        { error: 'Insufficient credits', code: 'INSUFFICIENT_CREDITS' },
        { status: 402 }
      );
    }

    // Generate speech using lib/ai wrapper
    const audioBuffer = await textToSpeech({
      text,
      voice,
      model,
    });

    // Deduct credits after successful synthesis
    await deductCredits(userId, CREDIT_COSTS.TEXT_TO_SPEECH, {
      description: 'Text-to-speech generation',
      endpoint: '/api/ai/text-to-speech',
    });

    // Return audio as blob - convert Buffer to Uint8Array for Response compatibility
    return new Response(new Uint8Array(audioBuffer), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'X-Model': model,
        'X-Voice': voice,
      },
    });
  } catch (error) {
    console.error('[AI Text-to-Speech Error]:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return Response.json(
      { error: 'Speech synthesis failed', message: errorMessage },
      { status: 500 }
    );
  }
}

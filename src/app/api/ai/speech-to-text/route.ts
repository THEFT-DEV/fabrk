/**
 * AI Speech-to-Text API Route
 * Transcribe audio using OpenAI Whisper
 */

import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { speechToText } from '@/lib/ai';

// Supported audio formats
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(req: NextRequest) {
  try {
    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          error: 'Speech-to-text not configured',
          message: 'OPENAI_API_KEY is required for transcription.',
        },
        { status: 503 }
      );
    }

    // Get session (optional)
    const session = await auth();
    const _userId = session?.user?.id;

    // Parse form data
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File | null;
    const language = (formData.get('language') as string) || undefined;

    if (!audioFile) {
      return Response.json(
        { error: 'Invalid request', message: 'audio file is required' },
        { status: 400 }
      );
    }

    // Validate file size
    if (audioFile.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: 'File too large', message: 'Audio file must be 25MB or less' },
        { status: 400 }
      );
    }

    // Optional: Check credits
    /*
    if (userId) {
      const { hasCredits, CREDIT_COSTS } = await import('@/lib/credits');
      const hasEnough = await hasCredits(userId, CREDIT_COSTS.SPEECH_TO_TEXT || 5);
      if (!hasEnough) {
        return Response.json(
          { error: 'Insufficient credits', code: 'INSUFFICIENT_CREDITS' },
          { status: 402 }
        );
      }
    }
    */

    // Transcribe audio using lib/ai wrapper
    const text = await speechToText(audioFile, { language });

    // Optional: Deduct credits
    /*
    if (userId) {
      const { deductCredits, CREDIT_COSTS } = await import('@/lib/credits');
      await deductCredits(userId, CREDIT_COSTS.SPEECH_TO_TEXT || 5, {
        description: 'Audio transcription',
        endpoint: '/api/ai/speech-to-text',
      });
    }
    */

    return Response.json({
      text,
      model: 'whisper-1',
      language,
    });
  } catch (error) {
    console.error('[AI Speech-to-Text Error]:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return Response.json({ error: 'Transcription failed', message: errorMessage }, { status: 500 });
  }
}

/**
 * AI Image Generation API Route
 * Generate images from text prompts using OpenAI DALL-E
 */

import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { generateImage } from '@/lib/ai';

// Image generation settings
const _IMAGE_SIZES = ['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792'] as const;
type ImageSize = (typeof _IMAGE_SIZES)[number];

const _IMAGE_STYLES = ['vivid', 'natural'] as const;
type ImageStyle = (typeof _IMAGE_STYLES)[number];

const _IMAGE_QUALITIES = ['standard', 'hd'] as const;
type ImageQuality = (typeof _IMAGE_QUALITIES)[number];

interface ImageRequest {
  prompt: string;
  size?: ImageSize;
  style?: ImageStyle;
  quality?: ImageQuality;
  n?: number;
}

export async function POST(req: NextRequest) {
  try {
    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          error: 'Image generation not configured',
          message: 'OPENAI_API_KEY is required for image generation.',
        },
        { status: 503 }
      );
    }

    // Get session (optional)
    const session = await auth();
    const _userId = session?.user?.id;

    // Parse request body
    const {
      prompt,
      size = '1024x1024',
      style = 'vivid',
      quality = 'standard',
      n = 1,
    }: ImageRequest = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { error: 'Invalid request', message: 'prompt is required' },
        { status: 400 }
      );
    }

    if (prompt.length > 4000) {
      return Response.json(
        { error: 'Invalid request', message: 'prompt must be 4000 characters or less' },
        { status: 400 }
      );
    }

    // Validate size for DALL-E 3
    const validSizes = ['1024x1024', '1792x1024', '1024x1792'] as const;
    const validatedSize = validSizes.includes(size as (typeof validSizes)[number])
      ? (size as '1024x1024' | '1792x1024' | '1024x1792')
      : '1024x1024';

    const numImages = Math.min(Math.max(1, n), 1); // DALL-E 3 only supports n=1

    // Optional: Check credits
    /*
    if (userId) {
      const { hasCredits, CREDIT_COSTS } = await import('@/lib/credits');
      const cost = CREDIT_COSTS.IMAGE_GENERATION * numImages;
      const hasEnough = await hasCredits(userId, cost);
      if (!hasEnough) {
        return Response.json(
          { error: 'Insufficient credits', code: 'INSUFFICIENT_CREDITS' },
          { status: 402 }
        );
      }
    }
    */

    // Generate image using lib/ai wrapper
    const urls = await generateImage({
      prompt,
      model: 'dall-e-3',
      size: validatedSize,
      quality,
      n: numImages,
    });

    // Optional: Deduct credits
    /*
    if (userId) {
      const { deductCredits, CREDIT_COSTS } = await import('@/lib/credits');
      await deductCredits(userId, CREDIT_COSTS.IMAGE_GENERATION * numImages, {
        description: `Image generation (${numImages} image${numImages > 1 ? 's' : ''})`,
        endpoint: '/api/ai/image',
      });
    }
    */

    return Response.json({
      images: urls.map((url) => ({ url })),
      model: 'dall-e-3',
      size: validatedSize,
      style,
      quality,
    });
  } catch (error) {
    console.error('[AI Image Error]:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('content policy')) {
      return Response.json(
        { error: 'Content policy', message: 'Your prompt was rejected due to content policy.' },
        { status: 400 }
      );
    }

    if (errorMessage.includes('rate limit')) {
      return Response.json(
        { error: 'Rate limited', message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    return Response.json(
      { error: 'Internal error', message: 'Failed to generate image' },
      { status: 500 }
    );
  }
}

/**
 * AI Memory API
 *
 * GET    /api/ai/memory - Search memories by query, scope, and scopeId
 * POST   /api/ai/memory - Add a new memory entry
 * DELETE /api/ai/memory - Remove memory entries by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { addMemory, searchMemory, deleteMemory } from '@/lib/ai/memory';

const memoryScopeSchema = z.enum(['chat', 'project', 'user']);

const searchParamsSchema = z.object({
  query: z.string().min(1),
  scope: memoryScopeSchema,
  scopeId: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(50).default(5),
});

const addMemorySchema = z.object({
  content: z.string().min(1).max(10000),
  scope: memoryScopeSchema,
  scopeId: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

const deleteMemorySchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
});

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const parsed = searchParamsSchema.safeParse({
      query: searchParams.get('query'),
      scope: searchParams.get('scope'),
      scopeId: searchParams.get('scopeId'),
      limit: searchParams.get('limit') ?? '5',
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid parameters' },
        { status: 400 }
      );
    }

    const { query, scope, scopeId, limit } = parsed.data;
    const results = await searchMemory(query, scope, scopeId, limit);

    return NextResponse.json({
      results: results.map((r) => ({
        id: r.entry.id,
        content: r.entry.content,
        scope: r.entry.scope,
        scopeId: r.entry.scopeId,
        metadata: r.entry.metadata,
        score: r.score,
        createdAt: r.entry.createdAt.toISOString(),
      })),
      count: results.length,
    });
  } catch (error) {
    console.error('[Memory] Search failed:', error);
    return NextResponse.json({ error: 'Failed to search memories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parsed = addMemorySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request body' },
        { status: 400 }
      );
    }

    const { content, scope, scopeId, metadata } = parsed.data;
    const entry = await addMemory(content, scope, scopeId, metadata);

    return NextResponse.json(
      {
        id: entry.id,
        content: entry.content,
        scope: entry.scope,
        scopeId: entry.scopeId,
        metadata: entry.metadata,
        createdAt: entry.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Memory] Add failed:', error);
    return NextResponse.json({ error: 'Failed to add memory' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parsed = deleteMemorySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'ids (array of strings) is required' },
        { status: 400 }
      );
    }

    await deleteMemory(parsed.data.ids);

    return NextResponse.json({ deleted: parsed.data.ids.length });
  } catch (error) {
    console.error('[Memory] Delete failed:', error);
    return NextResponse.json({ error: 'Failed to delete memories' }, { status: 500 });
  }
}

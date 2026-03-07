/**
 * Qdrant Vector Store
 *
 * Production vector store using Qdrant's HTTP API.
 * No SDK dependency required - uses native fetch.
 * Auto-creates collection on first use.
 */

import { logger } from '@/lib/logger';
import { generateEmbedding } from './embeddings';
import type { MemoryConfig, MemoryEntry, MemoryScope, MemorySearchResult, VectorStore } from './types';

interface QdrantSearchHit {
  id: string;
  score: number;
  payload: {
    content: string;
    scope: string;
    scopeId: string;
    metadata: Record<string, unknown>;
    createdAt: string;
  };
}

export class QdrantStore implements VectorStore {
  private baseUrl: string;
  private collection: string;
  private dimension: number;
  private initialized = false;

  constructor(config: MemoryConfig) {
    this.baseUrl = `http://${config.host}:${config.port}`;
    this.collection = config.collection;
    this.dimension = config.dimension;
  }

  private async request(path: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.baseUrl}${path}`;
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  private async ensureCollection(): Promise<void> {
    if (this.initialized) return;

    try {
      const res = await this.request(`/collections/${this.collection}`);
      if (res.status === 404) {
        // Create collection
        const createRes = await this.request(`/collections/${this.collection}`, {
          method: 'PUT',
          body: JSON.stringify({
            vectors: {
              size: this.dimension,
              distance: 'Cosine',
            },
          }),
        });

        if (!createRes.ok) {
          const error = await createRes.text();
          throw new Error(`Failed to create collection: ${error}`);
        }

        logger.info(`[Memory] Created Qdrant collection: ${this.collection}`);
      }

      this.initialized = true;
    } catch (error) {
      logger.error('[Memory] Qdrant collection init failed', error);
      throw error;
    }
  }

  async add(entries: MemoryEntry[]): Promise<void> {
    await this.ensureCollection();

    const points = await Promise.all(
      entries.map(async (entry) => {
        const embedding =
          entry.embedding && entry.embedding.length > 0
            ? entry.embedding
            : await generateEmbedding(entry.content);

        return {
          id: entry.id,
          vector: embedding,
          payload: {
            content: entry.content,
            scope: entry.scope,
            scopeId: entry.scopeId,
            metadata: entry.metadata || {},
            createdAt: entry.createdAt.toISOString(),
          },
        };
      })
    );

    // Filter out points with empty embeddings
    const validPoints = points.filter((p) => p.vector.length > 0);
    if (validPoints.length === 0) {
      logger.warn('[Memory] No valid embeddings to upsert');
      return;
    }

    const res = await this.request(`/collections/${this.collection}/points`, {
      method: 'PUT',
      body: JSON.stringify({ points: validPoints }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Failed to upsert points: ${error}`);
    }
  }

  async search(
    query: string,
    scope: MemoryScope,
    scopeId: string,
    limit: number = 5
  ): Promise<MemorySearchResult[]> {
    await this.ensureCollection();

    const queryEmbedding = await generateEmbedding(query);
    if (queryEmbedding.length === 0) {
      logger.warn('[Memory] Cannot search without embeddings');
      return [];
    }

    const res = await this.request(`/collections/${this.collection}/points/search`, {
      method: 'POST',
      body: JSON.stringify({
        vector: queryEmbedding,
        filter: {
          must: [
            { key: 'scope', match: { value: scope } },
            { key: 'scopeId', match: { value: scopeId } },
          ],
        },
        limit,
        with_payload: true,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Search failed: ${error}`);
    }

    const data = (await res.json()) as { result: QdrantSearchHit[] };

    return data.result.map((hit) => ({
      entry: {
        id: String(hit.id),
        content: hit.payload.content,
        scope: hit.payload.scope as MemoryEntry['scope'],
        scopeId: hit.payload.scopeId,
        metadata: hit.payload.metadata,
        createdAt: new Date(hit.payload.createdAt),
      },
      score: hit.score,
    }));
  }

  async delete(ids: string[]): Promise<void> {
    await this.ensureCollection();

    const res = await this.request(`/collections/${this.collection}/points/delete`, {
      method: 'POST',
      body: JSON.stringify({ points: ids }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Delete failed: ${error}`);
    }
  }
}

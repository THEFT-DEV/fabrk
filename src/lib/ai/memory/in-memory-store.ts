/**
 * In-Memory Vector Store
 *
 * Fallback store when no external vector DB is configured.
 * Uses simple cosine similarity for search.
 * Data is lost on server restart - suitable for development only.
 */

import { generateEmbedding } from './embeddings';
import type { MemoryEntry, MemoryScope, MemorySearchResult, VectorStore } from './types';

export class InMemoryStore implements VectorStore {
  private entries: Map<string, MemoryEntry> = new Map();

  async add(entries: MemoryEntry[]): Promise<void> {
    for (const entry of entries) {
      // Generate embedding if not provided
      if (!entry.embedding || entry.embedding.length === 0) {
        entry.embedding = await generateEmbedding(entry.content);
      }
      this.entries.set(entry.id, entry);
    }
  }

  async search(
    query: string,
    scope: MemoryScope,
    scopeId: string,
    limit: number = 5
  ): Promise<MemorySearchResult[]> {
    const queryEmbedding = await generateEmbedding(query);

    // Filter by scope
    const scopedEntries = Array.from(this.entries.values()).filter(
      (entry) => entry.scope === scope && entry.scopeId === scopeId
    );

    // If no embeddings available, do simple text matching
    if (queryEmbedding.length === 0) {
      const queryLower = query.toLowerCase();
      return scopedEntries
        .map((entry) => ({
          entry,
          score: textSimilarity(queryLower, entry.content.toLowerCase()),
        }))
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    }

    return scopedEntries
      .filter((entry): entry is MemoryEntry & { embedding: number[] } =>
        Array.isArray(entry.embedding) && entry.embedding.length > 0
      )
      .map((entry) => ({
        entry,
        score: cosineSimilarity(queryEmbedding, entry.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  async delete(ids: string[]): Promise<void> {
    for (const id of ids) {
      this.entries.delete(id);
    }
  }
}

/** Cosine similarity between two vectors */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

/** Simple word-overlap text similarity (fallback when no embeddings) */
function textSimilarity(query: string, content: string): number {
  const queryWords = new Set(query.split(/\s+/).filter(Boolean));
  const contentWords = new Set(content.split(/\s+/).filter(Boolean));

  let matches = 0;
  for (const word of queryWords) {
    if (contentWords.has(word)) matches++;
  }

  return queryWords.size === 0 ? 0 : matches / queryWords.size;
}

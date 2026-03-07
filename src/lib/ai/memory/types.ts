/**
 * Vector Memory / RAG System Types
 *
 * Multi-scope memory with vector search for contextual AI interactions.
 * Scopes: chat (conversation), project (workspace), user (personal).
 */

export type MemoryScope = 'chat' | 'project' | 'user';

export interface MemoryEntry {
  id: string;
  content: string;
  scope: MemoryScope;
  scopeId: string;
  metadata?: Record<string, unknown>;
  embedding?: number[];
  createdAt: Date;
}

export interface MemorySearchResult {
  entry: MemoryEntry;
  score: number;
}

export interface VectorStore {
  /** Add one or more memory entries to the store */
  add(entries: MemoryEntry[]): Promise<void>;

  /** Search for relevant memories by semantic similarity */
  search(query: string, scope: MemoryScope, scopeId: string, limit?: number): Promise<MemorySearchResult[]>;

  /** Delete memory entries by ID */
  delete(ids: string[]): Promise<void>;
}

export interface MemoryConfig {
  /** Qdrant host (default: localhost) */
  host: string;
  /** Qdrant port (default: 6333) */
  port: number;
  /** Qdrant collection name (default: fabrk_memories) */
  collection: string;
  /** Embedding vector dimension (default: 1536 for OpenAI) */
  dimension: number;
}

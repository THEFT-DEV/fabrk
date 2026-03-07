/**
 * Vercel AI SDK Provider Configuration
 *
 * Priority: Anthropic > OpenAI > Google > Ollama
 * Cloud providers are preferred for better structured output support.
 */

import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export type AIProvider = 'anthropic' | 'openai' | 'google' | 'ollama';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b';

export function getConfiguredProvider(): AIProvider | null {
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.GOOGLE_AI_API_KEY) return 'google';
  if (process.env.OLLAMA_ENABLED === 'true' || process.env.OLLAMA_BASE_URL) return 'ollama';
  return null;
}

function getAnthropicClient(): ReturnType<typeof createAnthropic> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not configured');
  return createAnthropic({ apiKey });
}

function getOpenAIClient(): ReturnType<typeof createOpenAI> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured');
  return createOpenAI({ apiKey });
}

function getGoogleClient(): ReturnType<typeof createGoogleGenerativeAI> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_AI_API_KEY is not configured');
  return createGoogleGenerativeAI({ apiKey });
}

function getOllamaClient(): ReturnType<typeof createOpenAICompatible> {
  return createOpenAICompatible({ name: 'ollama', baseURL: OLLAMA_BASE_URL });
}

export function getModel(provider?: AIProvider): ReturnType<ReturnType<typeof createAnthropic>> {
  const activeProvider = provider || getConfiguredProvider();

  if (!activeProvider) {
    throw new Error(
      'No AI provider configured. Set OLLAMA_ENABLED=true for local, or ANTHROPIC_API_KEY/OPENAI_API_KEY/GOOGLE_AI_API_KEY for cloud.'
    );
  }

  switch (activeProvider) {
    case 'anthropic':
      return getAnthropicClient()('claude-sonnet-4-20250514');
    case 'openai':
      return getOpenAIClient()('gpt-4o-mini');
    case 'google':
      return getGoogleClient()('gemini-1.5-flash');
    case 'ollama':
      return getOllamaClient()(OLLAMA_MODEL);
  }
}

export function isAIConfigured(): boolean {
  return getConfiguredProvider() !== null;
}

export function getCurrentProviderName(): string {
  const provider = getConfiguredProvider();
  switch (provider) {
    case 'anthropic':
      return 'Anthropic (Claude Sonnet)';
    case 'openai':
      return 'OpenAI (GPT-4o-mini)';
    case 'google':
      return 'Google (Gemini 1.5 Flash)';
    case 'ollama':
      return `Ollama (${OLLAMA_MODEL})`;
    default:
      return 'Not configured';
  }
}

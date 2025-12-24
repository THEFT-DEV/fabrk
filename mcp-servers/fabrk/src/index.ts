#!/usr/bin/env node
/**
 * Fabrk MCP Server
 * Terminal-styled SaaS boilerplate design system for AI tools
 */

import { createServer } from './server.js';

async function main() {
  const server = await createServer();

  // Log to stderr (stdout is reserved for MCP protocol)
  console.error('[FABRK MCP] Server starting...');
  console.error('[FABRK MCP] Design system: 77 components, 12 themes');
  console.error('[FABRK MCP] Ready for connections');
}

main().catch((error) => {
  console.error('[FABRK MCP] Fatal error:', error);
  process.exit(1);
});

# Fabrk Quick Start Prompts

Copy-paste these prompts into Claude Code to get started.

---

## Option 1: Basic Setup

```
Clone and run the Fabrk boilerplate:

git clone https://github.com/THEFT-DEV/fabrk.git /tmp/fabrk-demo
cd /tmp/fabrk-demo
npm install
npm run dev

Just run through it.
```

---

## Option 2: Setup + Generate Landing Page with AI

```
Clone the Fabrk boilerplate, set up the MCP server, and generate a landing page for my product.

git clone https://github.com/THEFT-DEV/fabrk.git /tmp/fabrk-mcp-demo
cd /tmp/fabrk-mcp-demo
npm install
cd mcp-servers/fabrk && npm install && npm run build && cd ../..

Now use the MCP to generate a landing page for an analytics SaaS called "Acme Analytics". Write it to src/app/(marketing)/page.tsx with hero, features, and CTA sections. Then run npm run dev.

Just do it.
```

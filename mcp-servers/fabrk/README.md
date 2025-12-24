# Fabrk MCP Server

Model Context Protocol server for AI-assisted development with the Fabrk design system.

```
███████████   █████████   ███████████  ███████████   █████   ████
░░███░░░░░░█  ███░░░░░███ ░░███░░░░░███░░███░░░░░███ ░░███   ███░
 ░███   █ ░  ░███    ░███  ░███    ░███ ░███    ░███  ░███  ███
 ░███████    ░███████████  ░██████████  ░██████████   ░███████
 ░███░░░█    ░███░░░░░███  ░███░░░░░███ ░███░░░░░███  ░███░░███
 ░███  ░     ░███    ░███  ░███    ░███ ░███    ░███  ░███ ░░███
 █████       █████   █████ ███████████  █████   █████ █████ ░░████
░░░░░       ░░░░░   ░░░░░ ░░░░░░░░░░░  ░░░░░   ░░░░░ ░░░░░   ░░░░
```

## Overview

This MCP server gives AI assistants (Claude Code, Cursor, etc.) deep knowledge of the Fabrk design system, enabling them to generate code that follows our terminal-first aesthetic.

### What It Provides

| Feature | Description |
|---------|-------------|
| **78+ components** | Full catalog with props, variants, and examples |
| **18 Themes** | CRT phosphor, retro computer, handheld, monochrome |
| **Design Tokens** | Colors, spacing, typography, mode object |
| **Code Generation** | Generate components and pages following Fabrk patterns |
| **Validation** | Check code against design system rules |

## Quick Setup

### 1. Build the MCP Server
```bash
cd mcp-servers/fabrk
npm install
npm run build
```

### 2. Configure Your AI Tool
Run from project root:
```bash
npm run mcp:setup
```
Or see manual configuration sections below.

## Manual Setup

### Claude Code

Create `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "fabrk": {
      "command": "node",
      "args": ["./mcp-servers/fabrk/dist/index.js"]
    }
  }
}
```

### Cursor

1. Open Cursor Settings (Cmd/Ctrl + ,)
2. Search for "MCP"
3. Add server configuration:
   - **Name:** fabrk
   - **Command:** node
   - **Args:** ./mcp-servers/fabrk/dist/index.js

### Claude Desktop

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fabrk": {
      "command": "node",
      "args": ["/absolute/path/to/project/mcp-servers/fabrk/dist/index.js"]
    }
  }
}
```

## Available Resources

Query these read-only data sources:

| Resource | URI | Description |
|----------|-----|-------------|
| Design System | `fabrk://design-system` | Mode object, tokens, design rules |
| Components | `fabrk://components` | 77 component catalog |
| Themes | `fabrk://themes` | 12 theme configurations |

**Example query:**
```
"Show me the Fabrk design system resources"
```

## Available Tools

### generate_component

Generate a Fabrk-styled component with terminal aesthetic.

**Parameters:**
- `componentType` (required): button, card, form, table, etc.
- `name` (required): Component name (e.g., PricingCard)
- `variant`: default, destructive, outline, etc.
- `withTerminalHeader`: Include `[ [0xXX] TITLE ]` header

**Example:**
```
"Generate a pricing card component with terminal header"
```

### generate_page

Scaffold a complete page using Fabrk templates.

**Parameters:**
- `pageType` (required): landing, dashboard, settings, auth, docs
- `pageName` (required): Name for the page
- `sections`: Array of sections (hero, features, pricing, cta, etc.)

**Example:**
```
"Generate a landing page with hero, features, and pricing sections"
```

### query_component

Get detailed documentation for a specific component.

**Parameters:**
- `component` (required): Component name or slug
- `include`: Array of [props, variants, examples, accessibility]

**Example:**
```
"Query the button component with props and variants"
```

### validate_code

Check code against Fabrk design system rules.

**Parameters:**
- `code` (required): TSX/JSX code to validate
- `strict`: Fail on warnings (not just errors)

**Example:**
```
"Validate this component code against Fabrk design rules"
```

## Available Prompts

Pre-configured guided workflows:

### build_landing_page

Build a terminal-styled landing page step by step.

**Arguments:**
- `productName` (required): Name of the product/app
- `sections`: Comma-separated list (hero, features, pricing, cta)

### add_dashboard_feature

Add a new feature card to a dashboard.

**Arguments:**
- `featureName` (required): Name of the feature
- `featureType`: analytics, settings, data-table, form

### create_form

Build a form with validation using Fabrk components.

**Arguments:**
- `formName` (required): Name for the form
- `fields` (required): Comma-separated list of field names

## Design System Rules

The MCP server enforces these rules:

1. **Terminal Aesthetic**
   - `rounded-none` on all elements
   - `font-mono` for all text
   - Button text: `> UPPERCASE_TEXT`
   - Label format: `[LABEL]:`
   - Card header: `[ [0xXX] TITLE ]`

2. **Color Tokens Only**
   - Use: `bg-background`, `text-foreground`, `border-border`
   - Never: `bg-white`, `#hexvalues`, `text-gray-500`

3. **Spacing Grid**
   - 8-point grid: 4px, 8px, 16px, 24px, 32px
   - Classes: `p-1`, `p-2`, `p-4`, `p-6`, `p-8`

4. **Typography**
   - Scale: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`
   - Never use arbitrary values like `text-[14px]`

## Example Usage

### Generate a Dashboard Card

```
Ask your AI: "Using the Fabrk MCP, generate an analytics card
component called RevenueCard with a terminal header"
```

### Build a Complete Page

```
Ask your AI: "Use Fabrk to scaffold a settings page with
profile, notifications, and security sections"
```

### Validate Existing Code

```
Ask your AI: "Validate this component against Fabrk design rules:
<Button className='rounded-md bg-blue-500'>Submit</Button>"
```

## Building from Source

If you need to rebuild the MCP server:

```bash
cd mcp-servers/fabrk
npm install
npm run build
```

## Troubleshooting

### Server not responding

1. Check the server is built: `ls mcp-servers/fabrk/dist/index.js`
2. If missing, run: `npm run mcp:build`
3. Restart your AI tool

### Config not found

Run `npm run mcp:setup` to auto-generate configuration.

### Wrong code style

The AI might not have loaded the MCP context. Try:
```
"Using the Fabrk MCP server, show me the design system rules"
```

## Support

- **Documentation:** `/docs/features/mcp-server`
- **Design System:** `/docs/design/theme-guide`
- **Components:** `/docs/components/overview`

---

Built for the Fabrk terminal-first design system.

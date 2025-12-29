'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { CodeBlock } from '@/components/ui/code-block';

export default function CodeBlockPage() {
  const typescriptCode = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`;

  const javascriptCode = `const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};`;

  const pythonCode = `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`;

  const bashCode = `npm install @/components/ui
npm run dev`;

  const jsonCode = `{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "next": "^14.0.0"
  }
}`;

  const cssCode = `.button {
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
}`;

  const longCode = `import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button onClick={addTodo}>&gt; ADD</Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`;

  return (
    <ComponentShowcaseTemplate
      code="[UI.83]"
      category="Components"
      title="Code Block"
      description="Syntax-highlighted code display with copy-to-clipboard functionality powered by Prism."
      importCode={`import { CodeBlock } from "@/components/ui/code-block"`}
      mainPreview={{
        preview: <CodeBlock code={typescriptCode} language="typescript" />,
        code: `const code = \`function greet(name: string): string {
  return \\\`Hello, \\\${name}!\\\`;
}\`;

<CodeBlock code={code} language="typescript" />`,
      }}
      variants={[
        {
          title: 'JavaScript',
          description: 'JavaScript syntax highlighting',
          preview: <CodeBlock code={javascriptCode} language="javascript" />,
          code: `<CodeBlock
  code={jsCode}
  language="javascript"
/>`,
        },
        {
          title: 'Python',
          description: 'Python syntax highlighting',
          preview: <CodeBlock code={pythonCode} language="python" />,
          code: `<CodeBlock
  code={pythonCode}
  language="python"
/>`,
        },
        {
          title: 'Bash/Shell',
          description: 'Shell commands with $ prompt',
          preview: <CodeBlock code={bashCode} language="bash" />,
          code: `<CodeBlock
  code={bashCode}
  language="bash"
/>`,
        },
        {
          title: 'JSON',
          description: 'JSON syntax highlighting',
          preview: <CodeBlock code={jsonCode} language="json" />,
          code: `<CodeBlock
  code={jsonCode}
  language="json"
/>`,
        },
        {
          title: 'CSS',
          description: 'CSS syntax highlighting',
          preview: <CodeBlock code={cssCode} language="css" />,
          code: `<CodeBlock
  code={cssCode}
  language="css"
/>`,
        },
        {
          title: 'With Copy Button',
          description: 'Hover to reveal copy button in top-right corner',
          preview: (
            <div className="space-y-2">
              <span className="text-muted-foreground font-mono text-xs">
                [HOVER]: Hover over code to see copy button
              </span>
              <CodeBlock code={typescriptCode} language="typescript" />
            </div>
          ),
          code: `// Copy button appears on hover automatically
<CodeBlock code={code} language="typescript" />`,
        },
        {
          title: 'Long Code Scroll',
          description: 'Scrollable for long code blocks',
          preview: <CodeBlock code={longCode} language="typescript" />,
          code: `// Automatically scrollable for overflow
<CodeBlock code={longCode} language="typescript" />`,
        },
      ]}
      props={[
        {
          name: 'code',
          type: 'string',
          default: '-',
          description: 'The code string to display',
        },
        {
          name: 'language',
          type: 'string',
          default: '"typescript"',
          description:
            'Programming language for syntax highlighting (typescript, javascript, python, bash, json, css, etc.)',
        },
      ]}
      accessibility={[
        'Uses semantic pre and code elements',
        'Copy button has descriptive aria-label',
        'Copy success state announced via aria-label change',
        "Code block has role='region' with aria-label",
        'Keyboard focusable with tabIndex for screen reader access',
        'Shell commands ($) use non-selectable prompts for better copying',
        'Copy button hidden from screen readers with aria-hidden icons',
      ]}
      previous={{ title: 'Checkbox', href: '/docs/components/checkbox' }}
      next={{ title: 'Collapsible', href: '/docs/components/collapsible' }}
    />
  );
}

/**
 * Client Schema Script Component
 *
 * Client-side version of SchemaScript for use in "use client" components
 * Uses useEffect to inject JSON-LD scripts without CSP nonce requirement
 *
 * Note: This component cannot use CSP nonce since it runs client-side
 * For full CSP compliance, use the server-side SchemaScript component
 *
 * Usage:
 * ```tsx
 * "use client"
 * import { ClientSchemaScript } from "@/components/security/client-schema-script"
 *
 * export function MyClientComponent() {
 *   const schema = generateFAQSchema(faqs);
 *   return (
 *     <>
 *       <ClientSchemaScript schema={schema} />
 *       ...
 *     </>
 *   );
 * }
 * ```
 */

'use client';

import { useEffect } from 'react';

export interface ClientSchemaScriptProps {
  schema: object | object[];
  id?: string;
}

/**
 * Client-side schema script injection
 * Adds JSON-LD scripts to the document head
 *
 * WARNING: Cannot use CSP nonce in client components
 * Consider refactoring to server component if possible
 */
export function ClientSchemaScript({ schema, id }: ClientSchemaScriptProps) {
  useEffect(() => {
    const schemaArray = Array.isArray(schema) ? schema : [schema];
    const scripts: HTMLScriptElement[] = [];

    schemaArray.forEach((item, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(item);
      if (id) {
        script.id = `${id}-${index}`;
      }
      document.head.appendChild(script);
      scripts.push(script);
    });

    // Cleanup on unmount
    return () => {
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [schema, id]);

  return null;
}

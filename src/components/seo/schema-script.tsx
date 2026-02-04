/**
 * Schema Script Component
 * Injects JSON-LD structured data into pages
 *
 * Critical for SEO, AEO, and GEO optimization
 *
 * Security: Uses CSP nonce to eliminate 'unsafe-inline' requirement
 */

import { NonceScript } from '@/components/security/nonce-script';

interface SchemaScriptProps {
  schema: object | object[];
}

/**
 * Render JSON-LD schema in a script tag with CSP nonce
 * Place this component in your page layout or component
 *
 * @example
 * <SchemaScript schema={generateFAQSchema(faqs)} />
 */
export async function SchemaScript({ schema }: SchemaScriptProps) {
  const schemaArray = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemaArray.map((item, index) => (
        <NonceScript key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </NonceScript>
      ))}
    </>
  );
}

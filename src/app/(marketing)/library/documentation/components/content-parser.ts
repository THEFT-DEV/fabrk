/**
 * ✅ FABRK COMPONENT
 * Content Parser Utility
 * Production-ready ✓
 */

/**
 * Parse markdown-style content into sections
 */
export function parseContent(content: string) {
  const lines = content.trim().split('\n');
  const sections: Array<{
    type: 'text' | 'heading' | 'code';
    content: string;
    language?: string;
  }> = [];
  let currentCodeBlock: string[] = [];
  let inCodeBlock = false;
  let codeLanguage = '';

  lines.forEach((line) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        sections.push({
          type: 'code',
          content: currentCodeBlock.join('\n'),
          language: codeLanguage,
        });
        currentCodeBlock = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLanguage = line.replace('```', '');
      }
    } else if (inCodeBlock) {
      currentCodeBlock.push(line);
    } else if (line.startsWith('##')) {
      sections.push({ type: 'heading', content: line.replace('## ', '') });
    } else if (line.trim()) {
      sections.push({ type: 'text', content: line });
    }
  });

  return sections;
}

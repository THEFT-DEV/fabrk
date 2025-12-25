export const formatDocsSectionTitle = (title: string, index: number): string => {
  const num = String(index + 1).padStart(2, '0');
  return `[${num}] ${title}`;
};

export const formatDocsItemTitle = (
  title: string,
  itemIndex: number,
  sectionIndex: number,
  subSectionIndex?: number
): string => {
  const secNum = String(sectionIndex + 1).padStart(2, '0');

  // Items inside a sub-section (e.g., Component list)
  if (subSectionIndex !== undefined) {
    // Enable 3rd level numbering: [07.1.1] ITEM
    const subNum = subSectionIndex + 1;
    const itemNum = itemIndex + 1;
    return `[${secNum}.${subNum}.${itemNum}] ${title}`;
  }

  // Direct items or Sub-Section Headers get numbered [XX.Y]
  const itemNum = itemIndex + 1;
  return `[${secNum}.${itemNum}] ${title}`;
};
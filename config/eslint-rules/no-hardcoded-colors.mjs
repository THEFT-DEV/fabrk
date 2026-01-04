const colorPattern = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?![0-9a-fA-F])(?=[$\s'"),.;:}\]>/]|$)/;
const allowedDirectories = ["/emails/", "/public/", "/sample_landing/"];

function isAllowedFile(filename) {
  return allowedDirectories.some((dir) => filename.includes(dir));
}

function literalContainsColor(node) {
  if (typeof node.value !== "string") return false;

  // Check for hex codes
  if (colorPattern.test(node.value)) return true;

  // Check for function colors (rgb, rgba, hsl, hsla, oklch)
  const functionMatch = node.value.match(/(rgb|rgba|hsl|hsla|oklch)\(/i);
  if (functionMatch) {
    // If it's a color function, ensure it does NOT contain 'var('
    // This allows hsl(var(--primary)) but flags hsl(123, 45%, 67%)
    if (!node.value.includes('var(')) {
      return true;
    }
  }

  return false;
}

function report(context, node) {
  context.report({
    node,
    message: "Use design tokens instead of hard-coded color values.",
  });
}

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow hard-coded hex/rgb/hsl colors in UI files",
    },
    schema: [],
  },
  create(context) {
    const filename = context.getFilename();
    if (isAllowedFile(filename)) {
      return {};
    }

    return {
      Literal(node) {
        if (literalContainsColor(node)) {
          report(context, node);
        }
      },
      TemplateElement(node) {
        const value = node.value?.raw ?? "";
        if (literalContainsColor({ value })) { // Pass value as a pseudo-node
          report(context, node);
        }
      },
      JSXAttribute(node) {
        if (node.value && node.value.type === "Literal" && typeof node.value.value === "string") {
          if (literalContainsColor(node.value)) { // Pass node.value as a pseudo-node
            report(context, node);
          }
        }
      },
    };
  },
};
// ❌ BAD - DO NOT DO THIS

export function BadButton() {
  return (
    <button
      className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white font-medium rounded-[8px] transition-colors"
      onClick={handleClick}
    >
      Save Changes
    </button>
  );
}

// Problems:
// 1. Custom button instead of Button component
// 2. Hardcoded hex colors (#10b981, #059669)
// 3. Arbitrary border-radius (rounded-[8px])
// 4. Missing accessibility considerations
// 5. Not using terminal text casing (should be UPPERCASE)
// 6. Missing > prefix for terminal aesthetic

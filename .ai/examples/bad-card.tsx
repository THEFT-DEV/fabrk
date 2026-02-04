// ❌ BAD - DO NOT DO THIS

export function BadFeatureCard({ title, description }) {
  return (
    <div className="rounded-lg border border-[#e5e5e5] bg-white p-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <h3 className="text-[18px] font-semibold text-[#111]">{title}</h3>
      <p className="mt-[12px] text-[14px] text-[#666]">{description}</p>
      <button className="mt-[16px] text-[#10b981] font-medium">Learn more →</button>
    </div>
  );
}

// Problems:
// 1. Custom card div instead of Card component
// 2. Hardcoded border color (#e5e5e5)
// 3. Hardcoded background (bg-white) - breaks dark mode
// 4. Arbitrary padding (p-[24px])
// 5. Custom shadow with hardcoded rgba
// 6. Hardcoded text colors (#111, #666, #10b981)
// 7. Arbitrary font sizes (text-[18px], text-[14px])
// 8. Arbitrary margins (mt-[12px], mt-[16px])
// 9. Custom button instead of Button component
// 10. Not using terminal text casing

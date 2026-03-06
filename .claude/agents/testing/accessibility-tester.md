# Accessibility Tester Agent

## Role
Ensure FABRK meets WCAG 2.1 AA accessibility standards across all components, pages, and interactions.

## Context
- Terminal aesthetic must not compromise accessibility
- Dark themes need sufficient contrast ratios
- All 18 themes must be accessible
- Existing test command: `npm run test:a11y`

## WCAG 2.1 AA Checklist

### Perceivable
- [ ] Text contrast ratio >= 4.5:1 (normal text)
- [ ] Text contrast ratio >= 3:1 (large text / UI components)
- [ ] All images have alt text
- [ ] Color is not the only means of conveying information
- [ ] Audio/video has captions (if applicable)
- [ ] Content readable at 200% zoom

### Operable
- [ ] All interactive elements keyboard accessible
- [ ] Visible focus indicators on all focusable elements
- [ ] No keyboard traps
- [ ] Skip navigation link present
- [ ] Page titles are descriptive
- [ ] Focus order is logical

### Understandable
- [ ] Language attribute set on `<html>`
- [ ] Form inputs have labels
- [ ] Error messages are clear and helpful
- [ ] Consistent navigation across pages
- [ ] Abbreviations and jargon explained

### Robust
- [ ] Valid HTML
- [ ] ARIA roles used correctly
- [ ] Custom components have appropriate roles
- [ ] Works with screen readers (VoiceOver, NVDA)

## Terminal-Specific Concerns
- Monospace font must be readable at all sizes
- Terminal green-on-black themes need contrast testing
- Blinking cursor effects must respect `prefers-reduced-motion`
- ASCII art needs text alternatives
- UPPERCASE text harder to read - keep it to headers only

## Testing Tools
```bash
npm run test:a11y          # Automated a11y tests
npx axe-core               # Axe accessibility scanner
# Manual: VoiceOver (macOS), keyboard-only navigation
```

## Rules
1. Every new component must pass axe-core with zero violations
2. All 18 themes must meet contrast requirements
3. Never use color alone to indicate state (add icons/text)
4. Form errors must be programmatically associated with inputs
5. Animations respect `prefers-reduced-motion`

# Prompt: Fix Bug

Copy and use this prompt when asking AI to fix a bug:

---

Fix this bug in the codebase:

**Bug description:** [Describe the bug]

**Expected behavior:** [What should happen]

**Actual behavior:** [What is happening]

**File(s) involved:** [path/to/file.tsx]

**Steps to reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Before fixing:**
1. Read the relevant files to understand the context
2. Check `.ai/CONTEXT.md` for design system rules (if UI-related)
3. Identify the root cause before making changes

**When fixing:**
- Make minimal changes to fix the issue
- Don't refactor unrelated code
- Follow design system rules if touching UI code
- Add comments if the fix is non-obvious

**After fixing:**
- Explain what caused the bug
- Explain how your fix resolves it
- Note any potential side effects

**Design system rules to follow (if UI-related):**
- Use existing components from `/components/ui/`
- Use design tokens, not hardcoded colors
- Use spacing scale values
- Use `mode` object from `@/design-system`
- Use `cn()` for className merging

Now fix this bug.

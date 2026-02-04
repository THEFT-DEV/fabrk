# Prompt: Refactor Code

Copy and use this prompt when asking AI to refactor existing code:

---

Refactor this code to follow the design system:

**File:** [path/to/file.tsx]

**What needs refactoring:**
- [Issue 1]
- [Issue 2]

**Before refactoring:**
1. Read `.ai/CONTEXT.md` for design system rules
2. Check `.ai/rules.md` for specific violations to fix
3. Review `.ai/components.md` for components that should be used

**Common issues to fix:**

1. **Hardcoded colors** → Use design tokens
   ```tsx
   // Before
   className="text-[#10b981]"
   className="bg-green-500"

   // After
   className="text-primary"
   className={mode.color.bg.success}
   ```

2. **Arbitrary values** → Use spacing scale
   ```tsx
   // Before
   className="p-[13px] gap-[22px]"

   // After
   className="p-3 gap-6"
   ```

3. **Custom elements** → Use existing components
   ```tsx
   // Before
   <button className="px-4 py-2 bg-blue-500 rounded">

   // After
   <Button>
   ```

4. **Missing mode object** → Add mode styling
   ```tsx
   // Before
   className="rounded-none font-mono"

   // After
   className={cn(mode.radius, mode.font)}
   ```

5. **Inline styles** → Use Tailwind classes
   ```tsx
   // Before
   style={{ marginTop: 20 }}

   // After
   className="mt-5"
   ```

**Output:**
- Show each change with before/after
- Explain why each change was necessary
- Ensure the refactored code follows all rules in `.ai/rules.md`

Now refactor this code.

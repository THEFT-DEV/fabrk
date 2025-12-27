# Git Rollback Guide

**Last Updated:** December 9, 2025
**Backup Tag:** `backup-before-component-optimization-20251209-180922`

This guide documents the component library optimization merge and provides rollback procedures if issues are discovered.

---

## 📋 Recent Merge Summary

### Component Optimization (December 9, 2025)

**Branch:** `feature/pro-pack-components` → `main`
**Merge Commit:** `809fb39e`
**Type:** Fast-forward merge (no merge commit created)

**Changes:**
- Optimized component library from 115 to 78 production-ready components
- Added 4 business logic components (api-key-manager, audit-log, onboarding-checklist, webhook-log)
- Archived 44 niche/specialized components to `.internal/archive/`
- Updated all documentation (component counts: 87 → 64)
- Updated visual regression tests (98 → 64 component pages)
- Moved misplaced files to proper directories
- Updated pricing references ($299 → $399)

**Statistics:**
- 137 files changed
- +8,292 insertions
- -27,344 deletions

**Commits Merged:**
1. `809fb39e` - refactor: move misplaced files to proper locations
2. `4513f31f` - docs: update all documentation and tests for 64-component structure
3. `cf7ad821` - feat: optimize component library from 115 to 78 production-ready components

---

## 🔐 Safety Backup

Before the merge, a backup tag was created:

```bash
Tag: backup-before-component-optimization-20251209-180922
Created: December 9, 2025 at 6:09 PM PST
Purpose: Restore point before component optimization merge
```

This tag points to the last commit on `main` before the merge, preserving the exact state with:
- 78+ components (60 production-ready + 55 niche/specialized)
- Original documentation structure
- All test suites with 98 component references

---

## 🚨 Rollback Options

### Option 1: Revert Merge (Recommended - Safest)

**Use when:** You want to undo the merge but keep git history clean.

**Command:**
```bash
git revert -m 1 809fb39e
```

**What it does:**
- Creates a new commit that undoes all changes from the merge
- Preserves full git history (shows both merge and revert)
- Safe for shared branches (doesn't rewrite history)
- Can be pushed without force

**Pros:**
- ✅ Safest option for production branches
- ✅ Preserves audit trail
- ✅ No force push required
- ✅ Can selectively restore files later

**Cons:**
- ❌ Creates additional revert commit
- ❌ History shows merge happened (and was undone)

**After reverting:**
```bash
git push origin main  # No --force needed
```

---

### Option 2: Hard Reset to Backup Tag (Nuclear Option)

**Use when:** You want to completely erase the merge from history.

**⚠️ WARNING:** This rewrites git history. Only use if:
- You haven't pushed to production yet
- You're the only person working on this branch
- You understand the consequences

**Command:**
```bash
git reset --hard backup-before-component-optimization-20251209-180922
```

**What it does:**
- Moves `main` branch pointer back to the backup tag
- Deletes all commits after the tag (809fb39e, 4513f31f, cf7ad821)
- Restores exact state from before merge
- Requires force push to remote

**After resetting:**
```bash
git push origin main --force  # ⚠️ Rewrites history!
```

**Pros:**
- ✅ Completely removes merge from history
- ✅ Clean git log (no revert commits)
- ✅ Exact restore to pre-merge state

**Cons:**
- ❌ Rewrites git history (dangerous on shared branches)
- ❌ Requires force push
- ❌ Other developers will have conflicts
- ❌ Can't easily redo the merge later

---

### Option 3: Selective File Restore (Surgical Approach)

**Use when:** You want to restore specific files without undoing the entire merge.

**Command (restore single file):**
```bash
git checkout backup-before-component-optimization-20251209-180922 -- path/to/file
```

**Command (restore entire directory):**
```bash
git checkout backup-before-component-optimization-20251209-180922 -- src/components/ui/
```

**What it does:**
- Restores specific file(s) to their pre-merge state
- Leaves all other changes intact
- Creates unstaged changes in working directory
- Requires manual commit

**Examples:**

Restore a single component:
```bash
git checkout backup-before-component-optimization-20251209-180922 -- src/components/ui/carousel.tsx
git add src/components/ui/carousel.tsx
git commit -m "fix: restore carousel component"
```

Restore all archived components:
```bash
git checkout backup-before-component-optimization-20251209-180922 -- .internal/archive/
git add .internal/archive/
git commit -m "chore: restore archived components directory"
```

Restore documentation:
```bash
git checkout backup-before-component-optimization-20251209-180922 -- docs/02-components/
git add docs/02-components/
git commit -m "docs: restore component documentation"
```

**Pros:**
- ✅ Surgical precision (only restore what you need)
- ✅ Doesn't affect other changes
- ✅ Safe for production (no force push)
- ✅ Can mix old and new files

**Cons:**
- ❌ Manual process (need to know exact file paths)
- ❌ Can create inconsistencies if not careful
- ❌ Doesn't restore git history

---

## 🎯 Decision Matrix

| Scenario | Recommended Option | Command |
|----------|-------------------|---------|
| **Merge caused production bug** | Option 1 (Revert) | `git revert -m 1 809fb39e` |
| **Need to undo everything cleanly** | Option 1 (Revert) | `git revert -m 1 809fb39e` |
| **Only one specific file is broken** | Option 3 (Selective) | `git checkout <tag> -- <file>` |
| **Need exact pre-merge state (local only)** | Option 2 (Reset) | `git reset --hard <tag>` |
| **Multiple people working on branch** | Option 1 (Revert) | Never use Option 2 |
| **Already pushed to production** | Option 1 (Revert) | Never use Option 2 |

---

## 📝 Rollback Checklist

If you decide to rollback, follow this checklist:

### Before Rollback

- [ ] Identify which specific changes are causing issues
- [ ] Document the bug/issue you're trying to fix
- [ ] Determine if full rollback is necessary or if surgical restore is sufficient
- [ ] Check if anyone else has pulled the changes
- [ ] Create a new backup tag of current state: `git tag backup-before-rollback-$(date +%Y%m%d-%H%M%S)`

### During Rollback

- [ ] Choose appropriate rollback option (see Decision Matrix)
- [ ] Run rollback command
- [ ] Verify changes with `git status` and `git diff`
- [ ] Test locally: `npm run dev`
- [ ] Run type check: `npm run type-check`
- [ ] Run tests: `npm run test:all`

### After Rollback

- [ ] Push changes: `git push origin main` (add `--force` only if using Option 2)
- [ ] Notify team if shared branch
- [ ] Document why rollback was necessary
- [ ] Plan fix for original issue
- [ ] Update Linear/issue tracker

---

## 🔍 Verification Commands

After rollback, verify the state:

```bash
# Check current branch and commit
git log --oneline -n 5

# Verify component count (should be 115 if fully rolled back)
find src/components/ui -name "*.tsx" | wc -l

# Verify archived components (should be empty if fully rolled back)
find .internal/archive/components -name "*.tsx" 2>/dev/null | wc -l

# Check documentation references
grep -r "78+ components" docs/ --count

# Run full test suite
npm run type-check
npm run lint
npm run test:all
```

---

## 🚀 Re-Merging After Rollback

If you rolled back to fix an issue and want to re-merge later:

### After Option 1 (Revert)

```bash
# Fix the issue in feature branch
git checkout feature/pro-pack-components
# ... make fixes ...
git commit -m "fix: address rollback issue"

# Merge again (will create new merge commit)
git checkout main
git merge feature/pro-pack-components
```

### After Option 2 (Reset)

```bash
# Feature branch still exists with all changes
git checkout feature/pro-pack-components
# ... make fixes ...
git commit -m "fix: address rollback issue"

# Merge again
git checkout main
git merge feature/pro-pack-components --no-ff  # Create merge commit
```

### After Option 3 (Selective)

```bash
# You're already on main with partial changes
# Just continue working normally
git add <files>
git commit -m "fix: restore and improve <component>"
```

---

## 📚 Additional Resources

- **Component Optimization Plan:** `/planning/phase-X/component-library-optimization.md`
- **Archive Summary:** `.internal/archive/docs/ARCHIVE_SUMMARY.md`
- **Component Inventory:** `docs/02-components/COMPONENTS-INVENTORY.md`
- **Git Best Practices:** `docs/04-development/GIT-WORKFLOW.md` (if exists)

---

## 🆘 Emergency Contact

If rollback doesn't work as expected:

1. **Don't panic** - Git history is preserved
2. **Check reflog:** `git reflog` shows all branch movements
3. **Restore from reflog:** `git reset --hard HEAD@{n}` where n is the entry you want
4. **Force push if needed:** `git push origin main --force` (use with extreme caution)

**Example:**
```bash
# View reflog to find desired state
git reflog

# Output shows:
# 809fb39e HEAD@{0}: merge feature/pro-pack-components: Fast-forward
# a1b2c3d4 HEAD@{1}: commit: previous work
# e5f6g7h8 HEAD@{2}: commit: even older work

# Restore to state before merge
git reset --hard HEAD@{1}
```

---

**Remember:** The backup tag `backup-before-component-optimization-20251209-180922` is permanent and can always be used as a restore point, even months from now.

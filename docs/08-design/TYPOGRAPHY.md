# Typography Audit - All Styles Per Page

Complete per-page breakdown of all typography styles across 81 pages.

**Last Scan:** 2025-11-29

---

## Table of Contents

1. [Accessibility Scan Results](#accessibility-scan-results)
2. [Landing/Home Page](#landinghome-page)
3. [Marketing Pages](#marketing-pages)
4. [Legal Pages](#legal-pages)
5. [Documentation Pages](#documentation-pages)
6. [Dashboard Pages](#dashboard-pages)
7. [Template Pages](#template-pages)
8. [Components Page](#components-page)
9. [Inconsistencies Summary](#inconsistencies-summary)

---

## Accessibility Scan Results

### WCAG 2.1 Compliance Summary

| Check | Status | Count | WCAG Criterion |
|-------|--------|-------|----------------|
| Pages Missing H1 | FAIL | 4 | 2.4.6 Headings |
| Multiple H1 per Page | FAIL | 1 | Best Practice |
| Skipped Heading Levels | FAIL | 6 | 1.3.1 Info/Relationships |
| Generic Link Text | PASS | 0 | 2.4.4 Link Purpose |
| Short Link Text (<3 chars) | WARN | 65 | 2.4.4 Link Purpose |
| Line Height >= 1.5x | PASS | 424 uses | 1.4.12 Text Spacing |

### Heading Structure Issues

#### Pages Missing H1 (4 pages)
```
/library/dashboards
/library/admin-panels
/library/account-pages
/library/marketing
```

#### Multiple H1 Tags (1 page)
```
/components - 2 h1 tags
```

#### Skipped Heading Levels (6 pages)
WCAG 1.3.1 requires heading levels to be sequential (h1 -> h2 -> h3, not h1 -> h3)

| Page | Levels Used |
|------|-------------|
| /library/settings-page | h1, h3 (missing h2) |
| /settings | h1, h3 (missing h2) |
| /dashboard | h1, h3 (missing h2) |
| /developer/api-keys | h1, h3 (missing h2) |
| /profile | h1, h3 (missing h2) |
| /account | h1, h3 (missing h2) |

### Text Size Accessibility

#### text-xs Usage (12px) - Potential Issues
WCAG SC 1.4.4 requires text to be resizable to 200%

| Page | text-xs Count | Issue |
|------|---------------|-------|
| `/terms` | 38 | Body text too small |
| `/privacy` | 32 | Body text too small |
| `/cookies` | 20 | Body text too small |
| `/refund` | 30 | Body text too small |
| `/contact` | 22 | Body text too small |
| `/features` | 19 | Body text too small |
| `/about` | 18 | Body text too small |

**Recommendation:** Change body text from `text-xs` (12px) to `text-sm` (14px) for WCAG compliance.

### ALL CAPS Headings Analysis

**Total:** 725 ALL CAPS headings across site
**Unique Patterns:** 549

Screen readers may spell out ALL CAPS text letter-by-letter. Consider using CSS `text-transform: uppercase` instead of literal caps.

Most Common:
| Pattern | Count |
|---------|-------|
| NEXT_STEPS | 24 |
| BEST_PRACTICES | 14 |
| OVERVIEW | 13 |
| CONFIGURATION | 9 |
| PAYMENTS | 7 |
| CODE_EXAMPLES | 6 |
| COMMON_USE_CASES | 6 |
| DATABASE_SCHEMA | 6 |

### Underscore-Style Headings

**Total:** 649 headings with underscores (terminal aesthetic)
**Unique Patterns:** 515

While underscores match the terminal aesthetic, they may affect screen reader pronunciation.

### Link Text Issues

#### Short Link Text (<3 chars)
| Text | Count | Issue |
|------|-------|-------|
| "X" | 65 | Twitter/X links - consider "X (Twitter)" for clarity |

### Color Contrast Summary

| Color Class | Usage Count |
|-------------|-------------|
| `text-muted-foreground` | 1,669 |
| `text-primary` | 653 |
| `text-foreground` | 385 |

**Note:** `text-muted-foreground` on dark backgrounds should maintain 4.5:1 contrast ratio per WCAG 1.4.3.

### Overall Statistics

```
Total Pages Scanned:        81
Total Headings Analyzed:    900
Total Links Analyzed:       2,061
Underscore Headings:        649
ALL CAPS Headings:          725
text-xs Body Usage:         976 instances (accessibility concern)
leading-relaxed Usage:      424 instances (WCAG compliant)
```

---

## Landing/Home Page

### `/` (Home) - via `src/components/home/*`

| Style | Count | Notes |
|-------|-------|-------|
| `font-mono` | 106 | Primary font |
| `text-muted-foreground` | 82 | Main body color |
| `text-xs` | 62 | Small text |
| `text-foreground` | 34 | Headings |
| `text-sm` | 33 | Body text |
| `gap-2` | 25 | Default gap |
| `font-bold` | 24 | Headings |
| `text-center` | 23 | Centered sections |
| `font-semibold` | 23 | Subheadings |
| `mb-4` | 20 | Standard margin |
| `text-primary` | 14 | Accent color |
| `text-3xl` | 12 | Section titles |
| `text-2xl` | 11 | Subsection titles |
| `text-4xl` | 7 | Hero titles |
| `tracking-tight` | 5 | Headings |
| `text-6xl` | 1 | Large hero |
| `text-5xl` | 2 | Hero |

---

## Marketing Pages

### `/about`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 27 |
| `text-xs` | 18 |
| `text-sm` | 15 |
| `mb-4` | 11 |
| `font-bold` | 7 |
| `text-center` | 6 |
| `text-3xl` | 6 |
| `text-success` | 5 |
| `text-2xl` | 5 |
| `text-primary` | 4 |
| `font-semibold` | 3 |
| `tracking-tight` | 1 |
| `text-4xl` | 1 |
| `font-mono` | 1 |

**Issues:** Missing `font-mono` consistency, mixed heading sizes

---

### `/contact`

| Style | Count |
|-------|-------|
| `text-xs` | 22 |
| `text-muted-foreground` | 16 |
| `text-sm` | 13 |
| `font-semibold` | 7 |
| `text-primary` | 6 |
| `text-left` | 4 |
| `text-foreground` | 4 |
| `text-destructive` | 4 |
| `text-center` | 3 |
| `font-bold` | 2 |
| `text-xl` | 1 |
| `text-3xl` | 1 |
| `text-2xl` | 1 |
| `font-mono` | 1 |

**Issues:** Missing `font-mono` consistency, inconsistent heading hierarchy

---

### `/features`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 22 |
| `text-xs` | 19 |
| `font-bold` | 10 |
| `text-sm` | 9 |
| `text-primary` | 8 |
| `mb-4` | 7 |
| `text-center` | 6 |
| `tracking-tight` | 5 |
| `text-2xl` | 4 |
| `text-lg` | 3 |
| `text-3xl` | 2 |
| `font-medium` | 2 |
| `text-4xl` | 1 |
| `font-mono` | 1 |

**Issues:** Very low `font-mono` usage (1), inconsistent with terminal theme

---

### `/pricing`

| Style | Count |
|-------|-------|
| `font-mono` | 4 |
| `text-muted-foreground` | 2 |
| `mb-4` | 2 |
| `tracking-tight` | 1 |
| `text-xs` | 1 |
| `text-sm` | 1 |
| `text-center` | 1 |
| `text-4xl` | 1 |
| `text-3xl` | 1 |
| `font-bold` | 1 |

**Issues:** Very minimal styling, relies on components

---

### `/library`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 10 |
| `font-mono` | 9 |
| `text-xs` | 8 |
| `text-foreground` | 3 |
| `text-primary` | 2 |
| `text-success` | 1 |
| `text-sm` | 1 |
| `text-lg` | 1 |
| `text-4xl` | 1 |
| `font-semibold` | 1 |
| `font-bold` | 1 |

---

## Legal Pages

### `/terms`

| Style | Count |
|-------|-------|
| `text-xs` | 51 |
| `text-muted-foreground` | 49 |
| `mb-2` | 22 |
| `text-destructive` | 16 |
| `text-sm` | 15 |
| `font-semibold` | 15 |
| `mb-4` | 14 |
| `font-bold` | 13 |
| `text-lg` | 12 |
| `gap-2` | 12 |
| `space-y-1` | 9 |
| `text-foreground` | 6 |
| `text-primary` | 4 |
| `text-4xl` | 1 |
| `text-3xl` | 1 |
| `font-mono` | 1 |

**Issues:** Body uses `text-xs` (too small), only 1 `font-mono`

---

### `/privacy`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 52 |
| `text-xs` | 51 |
| `text-foreground` | 47 |
| `space-y-1` | 15 |
| `mb-4` | 13 |
| `mb-3` | 13 |
| `mb-2` | 13 |
| `font-bold` | 13 |
| `text-sm` | 12 |
| `text-lg` | 12 |
| `gap-2` | 12 |
| `font-semibold` | 10 |
| `text-primary` | 6 |
| `text-4xl` | 1 |
| `text-3xl` | 1 |
| `font-mono` | 1 |

**Issues:** Body uses `text-xs` (too small), only 1 `font-mono`

---

### `/cookies`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 44 |
| `text-xs` | 33 |
| `text-foreground` | 23 |
| `text-left` | 12 |
| `text-sm` | 11 |
| `mb-3` | 11 |
| `mb-2` | 9 |
| `font-semibold` | 9 |
| `mb-4` | 8 |
| `text-primary` | 7 |
| `font-bold` | 7 |
| `text-lg` | 6 |
| `text-4xl` | 1 |
| `text-3xl` | 1 |
| `font-mono` | 1 |

**Issues:** Body uses `text-xs` (too small), only 1 `font-mono`

---

### `/refund`

| Style | Count |
|-------|-------|
| `text-xs` | 42 |
| `text-muted-foreground` | 40 |
| `text-foreground` | 13 |
| `mb-4` | 11 |
| `font-bold` | 11 |
| `text-lg` | 10 |
| `mb-3` | 10 |
| `gap-2` | 10 |
| `space-y-1` | 8 |
| `text-primary` | 7 |
| `text-destructive` | 7 |
| `mt-3` | 6 |
| `mb-2` | 5 |
| `font-semibold` | 5 |
| `text-sm` | 4 |
| `text-4xl` | 1 |
| `text-3xl` | 1 |
| `font-mono` | 1 |

**Issues:** Body uses `text-xs` (too small), only 1 `font-mono`

---

## Documentation Pages

### `/docs/getting-started`

| Style | Count |
|-------|-------|
| `font-mono` | 70 |
| `text-sm` | 34 |
| `text-muted-foreground` | 30 |
| `space-y-4` | 22 |
| `text-primary` | 20 |
| `font-bold` | 17 |
| `text-xs` | 14 |
| `text-base` | 13 |
| `font-semibold` | 13 |
| `text-foreground` | 11 |
| `leading-relaxed` | 9 |
| `text-lg` | 8 |

**Standard:** Good `font-mono` usage, consistent hierarchy

---

### `/docs/architecture`

| Style | Count |
|-------|-------|
| `font-mono` | 18 |
| `text-sm` | 10 |
| `text-muted-foreground` | 10 |
| `leading-relaxed` | 8 |
| `space-y-4` | 5 |
| `font-bold` | 5 |
| `text-primary` | 4 |
| `text-lg` | 4 |
| `text-foreground` | 3 |
| `text-base` | 3 |
| `font-semibold` | 3 |

---

### `/docs/tutorials/authentication`

| Style | Count |
|-------|-------|
| `font-mono` | 101 |
| `text-sm` | 49 |
| `text-muted-foreground` | 49 |
| `text-xs` | 21 |
| `text-foreground` | 19 |
| `text-base` | 19 |
| `space-y-4` | 19 |
| `leading-relaxed` | 19 |
| `font-semibold` | 19 |
| `font-bold` | 16 |
| `text-primary` | 13 |
| `text-lg` | 8 |

**Standard:** Highest `font-mono` count, good hierarchy

---

### `/docs/features/payments`

| Style | Count |
|-------|-------|
| `font-mono` | 82 |
| `text-muted-foreground` | 46 |
| `text-sm` | 43 |
| `leading-relaxed` | 27 |
| `space-y-4` | 16 |
| `font-semibold` | 16 |
| `font-bold` | 16 |
| `text-primary` | 13 |
| `gap-2` | 12 |
| `text-lg` | 10 |

---

### `/docs/features/mfa`

| Style | Count |
|-------|-------|
| `font-mono` | 70 |
| `text-sm` | 37 |
| `text-muted-foreground` | 36 |
| `leading-relaxed` | 21 |
| `text-primary` | 16 |
| `font-semibold` | 16 |
| `space-y-4` | 15 |
| `font-bold` | 12 |
| `text-lg` | 11 |
| `space-y-1` | 9 |

---

### `/docs/features/cloud-storage`

| Style | Count |
|-------|-------|
| `font-mono` | 65 |
| `text-sm` | 31 |
| `text-muted-foreground` | 30 |
| `font-bold` | 22 |
| `leading-relaxed` | 14 |
| `font-semibold` | 13 |
| `text-primary` | 12 |
| `space-y-4` | 12 |
| `text-xs` | 11 |
| `text-primary-foreground` | 10 |

---

### `/docs/features/cookie-consent`

| Style | Count |
|-------|-------|
| `font-mono` | 68 |
| `text-sm` | 35 |
| `text-muted-foreground` | 31 |
| `leading-relaxed` | 19 |
| `space-y-4` | 16 |
| `font-bold` | 16 |
| `text-primary` | 12 |
| `font-semibold` | 12 |
| `text-lg` | 11 |
| `font-medium` | 11 |

---

### `/docs/extras/theming`

| Style | Count |
|-------|-------|
| `font-mono` | 78 |
| `text-sm` | 35 |
| `text-muted-foreground` | 35 |
| `font-semibold` | 26 |
| `text-xs` | 24 |
| `gap-2` | 24 |
| `text-primary` | 14 |
| `font-bold` | 13 |
| `space-y-4` | 11 |
| `text-lg` | 10 |

---

### Other Docs Pages (Summary)

All docs pages consistently use:
- `font-mono` as primary font (18-101 instances per page)
- `text-sm` for body text
- `text-muted-foreground` for body color
- `text-primary` for h2 headings
- `text-foreground` for h3 headings
- `text-lg` for h2 size
- `text-base` for h3 size
- `leading-relaxed` for line height
- `space-y-4` for section spacing

---

## Dashboard Pages

### `/dashboard`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 12 |
| `text-sm` | 8 |
| `font-medium` | 8 |
| `text-success` | 6 |
| `text-destructive` | 6 |
| `text-xs` | 4 |
| `text-2xl` | 4 |
| `space-y-0` | 4 |
| `gap-6` | 4 |
| `gap-1` | 4 |

**Pattern:** Dashboard uses `text-2xl` for stats, `text-sm` for labels

---

### `/admin`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 14 |
| `text-sm` | 12 |
| `text-xs` | 9 |
| `font-semibold` | 8 |
| `text-2xl` | 5 |
| `space-y-0` | 5 |
| `font-medium` | 5 |
| `font-bold` | 5 |
| `text-success` | 4 |
| `gap-6` | 3 |

---

### `/profile`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 10 |
| `text-sm` | 9 |
| `space-y-2` | 5 |
| `gap-3` | 5 |
| `font-medium` | 4 |
| `gap-6` | 3 |
| `font-semibold` | 2 |
| `space-y-6` | 2 |
| `tracking-tight` | 1 |

---

### `/billing/invoices`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 6 |
| `text-sm` | 3 |
| `text-lg` | 3 |
| `font-semibold` | 2 |
| `font-medium` | 2 |
| `text-right` | 2 |
| `gap-2` | 2 |
| `tracking-tight` | 1 |

---

### `/settings/security`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 1 |
| `text-lg` | 1 |
| `text-4xl` | 1 |
| `mb-8` | 1 |
| `mb-4` | 1 |
| `mb-2` | 1 |
| `font-bold` | 1 |

**Issue:** Very minimal styling, may need more structure

---

### Organization Pages

| Page | Top Styles |
|------|------------|
| `/organizations/new` | `gap-2` (7), `text-muted-foreground` (6), `text-xs` (3) |
| `/organizations/[slug]/members` | `text-muted-foreground` (9), `text-sm` (6), `text-primary` (4) |
| `/organizations/[slug]/billing` | `text-muted-foreground` (12), `text-sm` (11), `font-medium` (10) |

---

## Template Pages

### `/library/settings-page`

| Style | Count |
|-------|-------|
| `font-mono` | 64 |
| `text-xs` | 63 |
| `text-muted-foreground` | 41 |
| `gap-3` | 12 |
| `gap-2` | 12 |
| `text-success` | 11 |
| `mb-4` | 11 |
| `gap-1` | 11 |
| `text-primary` | 8 |
| `space-y-2` | 6 |

---

### `/library/security-privacy`

| Style | Count |
|-------|-------|
| `font-mono` | 57 |
| `text-xs` | 54 |
| `text-muted-foreground` | 41 |
| `gap-2` | 17 |
| `text-success` | 13 |
| `gap-1` | 11 |
| `mb-4` | 10 |
| `text-primary` | 6 |
| `text-destructive` | 5 |

---

### `/library/billing-dashboard`

| Style | Count |
|-------|-------|
| `font-mono` | 49 |
| `text-xs` | 47 |
| `text-muted-foreground` | 37 |
| `gap-2` | 16 |
| `text-success` | 14 |
| `gap-1` | 8 |
| `mb-4` | 7 |
| `space-y-2` | 5 |

---

### `/library/team-dashboard`

| Style | Count |
|-------|-------|
| `font-mono` | 48 |
| `text-xs` | 46 |
| `text-muted-foreground` | 37 |
| `text-success` | 12 |
| `gap-2` | 7 |
| `gap-1` | 7 |
| `mb-3` | 5 |
| `mb-1` | 5 |
| `text-2xl` | 4 |

---

## Components Page

### `/components`

| Style | Count |
|-------|-------|
| `text-muted-foreground` | 25 |
| `text-xs` | 18 |
| `font-bold` | 14 |
| `space-y-4` | 12 |
| `tracking-tight` | 8 |
| `text-2xl` | 8 |
| `space-y-6` | 8 |
| `font-semibold` | 8 |
| `text-sm` | 7 |
| `gap-3` | 5 |
| `font-mono` | 1 |

**Issue:** Only 1 `font-mono` - doesn't match terminal aesthetic

---

## Inconsistencies Summary

### Critical Issues

| Page/Section | Issue | Current | Should Be |
|--------------|-------|---------|-----------|
| Legal pages (all) | Body text too small | `text-xs` | `text-sm` |
| Legal pages (all) | Missing terminal font | 1x `font-mono` | 50+ `font-mono` |
| `/about` | Missing terminal font | 1x `font-mono` | 50+ `font-mono` |
| `/contact` | Missing terminal font | 1x `font-mono` | 50+ `font-mono` |
| `/features` | Missing terminal font | 1x `font-mono` | 50+ `font-mono` |
| `/components` | Missing terminal font | 1x `font-mono` | 50+ `font-mono` |

### Heading Inconsistencies

| Location | h1 Size | h2 Size | h3 Size |
|----------|---------|---------|---------|
| Docs | `text-2xl lg:text-3xl` | `text-lg` | `text-base` |
| Marketing | `text-3xl lg:text-4xl` | `text-2xl lg:text-3xl` | `text-lg` |
| Legal | `text-3xl lg:text-4xl` | `text-lg` | `text-sm` |
| Dashboard | `text-4xl` | `text-lg` | - |
| Templates | `text-4xl` | - | - |

### Font Weight Inconsistencies

| Element | Docs | Marketing | Legal |
|---------|------|-----------|-------|
| h1 | `font-bold` | `font-bold` | `font-bold` |
| h2 | `font-bold text-primary` | `font-bold` | `font-bold` |
| h3 | `font-semibold text-foreground` | `font-semibold` OR `font-bold` | `font-semibold` |

### Spacing Inconsistencies

| Section Type | Docs | Marketing | Legal |
|--------------|------|-----------|-------|
| Major sections | `space-y-16` | `space-y-78/78` | `space-y-6` |
| Inner sections | `space-y-4` | `space-y-4/6/8` | `space-y-4` |
| Lists | `space-y-1` | `space-y-2` | `space-y-1` |

---

## Recommended Standard

### Text Sizes

| Element | Class | Usage |
|---------|-------|-------|
| h1 (page title) | `text-2xl lg:text-3xl` | Page headers |
| h2 (section) | `text-lg` | Section headers |
| h3 (subsection) | `text-base` | Subsections |
| Body | `text-sm` | All body text |
| Small/Label | `text-xs` | Labels, badges, meta |

### Font Weights

| Element | Class |
|---------|-------|
| h1 | `font-bold` |
| h2 | `font-bold` |
| h3 | `font-semibold` |
| Body | `font-normal` (default) |
| Labels | `font-medium` |

### Colors

| Element | Class |
|---------|-------|
| h1 | `text-foreground` |
| h2 | `text-primary` (pink) |
| h3 | `text-foreground` (white) |
| Body | `text-muted-foreground` (gray) |

### Spacing

| Context | Class |
|---------|-------|
| Between major sections | `space-y-16` |
| Between heading and content | `space-y-4` |
| Between list items | `space-y-1` |
| Between steps | `space-y-10` |

### Font Family

ALL pages should use `font-mono` for terminal aesthetic:
- Add `font-mono` to all text elements
- Use JetBrains Mono as the font stack

---

## Files Requiring Updates

### High Priority (Missing Terminal Font)

1. `src/app/about/page.tsx` - Add `font-mono` throughout
2. `src/app/contact/page.tsx` - Add `font-mono` throughout
3. `src/app/features/page.tsx` - Add `font-mono` throughout
4. `src/app/components/page.tsx` - Add `font-mono` throughout
5. `src/app/(legal)/terms/page.tsx` - Add `font-mono`, change `text-xs` to `text-sm`
6. `src/app/(legal)/privacy/page.tsx` - Add `font-mono`, change `text-xs` to `text-sm`
7. `src/app/(legal)/cookies/page.tsx` - Add `font-mono`, change `text-xs` to `text-sm`
8. `src/app/(legal)/refund/page.tsx` - Add `font-mono`, change `text-xs` to `text-sm`

### Medium Priority (Heading Standardization)

1. Marketing pages - Standardize h2/h3 colors to match docs
2. Dashboard pages - Add `text-primary` to h2 headings
3. Template pages - Consistent heading hierarchy

### Low Priority (Spacing Refinement)

1. Legal pages - Increase `space-y-6` to `space-y-16`
2. Marketing pages - Standardize section spacing

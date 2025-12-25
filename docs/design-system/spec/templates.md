# Page Templates Specification

> Classification of all pages into templates vs one-offs, with template contracts and implementation priorities.

## Page Archetypes

Based on comprehensive audit of 200+ pages across the application, pages fall into **7 distinct archetypes**:

| Archetype             | Description                     | Count | Template Priority |
| --------------------- | ------------------------------- | ----- | ----------------- |
| **Marketing/Landing** | Public-facing promotional pages | 12    | HIGH              |
| **Auth**              | Authentication flows            | 6     | HIGH              |
| **Dashboard**         | Data-heavy overview pages       | 8     | HIGH              |
| **List/Table**        | Tabular data with CRUD          | 15    | HIGH              |
| **Detail/Object**     | Single entity view              | 10    | MEDIUM            |
| **Settings**          | Configuration forms             | 8     | MEDIUM            |
| **Docs**              | Documentation content           | 151   | COMPLETE          |
| **Legal**             | Legal/policy pages              | 4     | LOW               |
| **Utility**           | Error, loading, maintenance     | 5     | LOW               |

---

## Archetype Definitions

### 1. Marketing/Landing

**Purpose**: Convert visitors to users

**Characteristics**:

- Hero section with CTA
- Feature highlights
- Social proof (testimonials, logos)
- Pricing comparison
- FAQ sections

**Existing Templates**: `MarketingPageTemplate` wrapper

**Pages**:
| Page | Path | Template Candidate | Notes |
|------|------|-------------------|-------|
| Main Landing | `/` | TRUE | Custom hero required |
| Alt Landing | `/landing-alt` | TRUE | A/B test variant |
| Features | `/features` | TRUE | Feature grid + details |
| Pricing | `/pricing` | TRUE | Plan comparison |
| About | `/about` | TRUE | Team, mission |
| Contact | `/contact` | TRUE | Form + info |
| Blog List | `/blog` | TRUE | Post grid |
| Blog Post | `/blog/[slug]` | TRUE | Article layout |
| Purchase | `/purchase` | ONE-OFF | Checkout flow |
| Success | `/success` | ONE-OFF | Confirmation page |

### 2. Auth

**Purpose**: User authentication flows

**Characteristics**:

- Centered card layout
- Form with validation
- Social auth options
- Link to alternate flow (sign in ↔ sign up)
- Password visibility toggle

**Existing Templates**: Sign-in, Sign-up, Forgot Password, Two-Factor in `/templates/authentication/`

**Pages**:
| Page | Path | Template Candidate | Notes |
|------|------|-------------------|-------|
| Sign In | `/auth/signin` | TRUE | Matches template |
| Sign Up | `/auth/signup` | TRUE | Matches template |
| Forgot Password | `/auth/forgot` | TRUE | Matches template |
| Reset Password | `/auth/reset` | TRUE | Matches template |
| Two-Factor | `/auth/2fa` | TRUE | Matches template |
| Email Verify | `/auth/verify` | TRUE | Simple confirmation |

### 3. Dashboard

**Purpose**: Overview with key metrics and quick actions

**Characteristics**:

- Stats cards grid (4 columns on desktop)
- Recent activity feed
- Quick action buttons
- Charts/visualizations
- Notification badges

**Existing Templates**: `analytics-dashboard`, `team-dashboard`, `billing-dashboard` in `/templates/`

**Pages**:
| Page | Path | Template Candidate | Notes |
|------|------|-------------------|-------|
| Main Dashboard | `/dashboard` | TRUE | Core metrics |
| Admin Overview | `/dashboard/admin` | TRUE | System health |
| Admin Analytics | `/dashboard/admin/analytics` | TRUE | Charts + metrics |
| Admin Monitoring | `/dashboard/admin/monitoring` | TRUE | Error tracking |
| Org Dashboard | `/dashboard/org/[id]` | TRUE | Org-level metrics |
| Examples Analytics | `/examples/analytics` | TRUE | Demo dashboard |
| Examples Admin | `/examples/admin` | TRUE | Demo admin |
| Billing Overview | `/dashboard/billing` | TRUE | Subscription status |

### 4. List/Table

**Purpose**: Display and manage collections of items

**Characteristics**:

- Search/filter toolbar
- Sortable table headers
- Pagination
- Bulk actions
- Row actions (edit, delete)
- Empty state

**Existing Templates**: `user-management`, `search-results` in `/templates/`

**Pages**:
| Page | Path | Template Candidate | Notes |
|------|------|-------------------|-------|
| Admin Users | `/dashboard/admin/users` | TRUE | DataTable |
| Admin Audit Log | `/dashboard/admin/audit-log` | TRUE | Event log table |
| Admin Security | `/dashboard/admin/security` | TRUE | Security events |
| Admin Feature Flags | `/dashboard/admin/feature-flags` | TRUE | Flag management |
| Org Members | `/dashboard/org/[id]/members` | TRUE | Member table |
| API Keys | `/dashboard/developer/api-keys` | TRUE | Key management |
| Invoices | `/dashboard/billing/invoices` | TRUE | Invoice history |
| Payment Methods | `/dashboard/billing/payment-methods` | TRUE | Card list |
| Notifications | `/dashboard/notifications` | TRUE | Notification list |
| Sessions | `/dashboard/account/sessions` | TRUE | Active sessions |
| Blog Admin | `/dashboard/admin/blog` | TRUE | Post management |
| Files | `/dashboard/files` | TRUE | File browser |
| Search Results | `/search` | TRUE | Result list |
| Audit History | `/dashboard/audit` | TRUE | Change log |
| Webhooks | `/dashboard/developer/webhooks` | TRUE | Webhook list |

### 5. Detail/Object

**Purpose**: View and edit a single entity

**Characteristics**:

- Header with title + actions
- Tabbed content sections
- Metadata sidebar
- Related items section
- Edit mode toggle

**Existing Templates**: `profile`, `blog/post` in `/templates/`

**Pages**:
| Page | Path | Template Candidate | Notes |
|------|------|-------------------|-------|
| User Profile | `/dashboard/profile` | TRUE | Avatar, bio, links |
| Account | `/dashboard/account` | TRUE | Tabbed settings |
| Org Settings | `/dashboard/org/[id]/settings` | TRUE | Org config |
| API Key Detail | `/dashboard/developer/api-keys/[id]` | TRUE | Key info |
| Invoice Detail | `/dashboard/billing/invoices/[id]` | TRUE | Invoice view |
| User Detail (Admin) | `/dashboard/admin/users/[id]` | TRUE | User management |
| Blog Post Edit | `/dashboard/admin/blog/[slug]` | TRUE | Post editor |
| Feature Flag Detail | `/dashboard/admin/feature-flags/[id]` | TRUE | Flag config |
| Webhook Detail | `/dashboard/developer/webhooks/[id]` | TRUE | Webhook config |
| File Detail | `/dashboard/files/[id]` | TRUE | File preview |

### 6. Settings

**Purpose**: Configure application or user preferences

**Characteristics**:

- Sidebar navigation OR tabs
- Form sections with labels
- Save button (floating or per-section)
- Danger zone at bottom
- Reset to defaults option

**Existing Templates**: `settings-page`, `security-privacy` in `/templates/`

**Pages**:
| Page | Path | Template Candidate | Notes |
|------|------|-------------------|-------|
| General Settings | `/dashboard/settings` | TRUE | Appearance, language |
| Security Settings | `/dashboard/settings/security` | TRUE | 2FA, password |
| Notification Settings | `/dashboard/settings/notifications` | TRUE | Email prefs |
| Privacy Settings | `/dashboard/settings/privacy` | TRUE | Data controls |
| Org Settings | `/dashboard/org/[id]/settings` | TRUE | Org config |
| Org Billing | `/dashboard/org/[id]/billing` | TRUE | Plan management |
| Developer Settings | `/dashboard/developer` | TRUE | API config |
| Admin Settings | `/dashboard/admin/settings` | TRUE | System config |

### 7. Docs

**Purpose**: Documentation and guides

**Characteristics**:

- Sidebar navigation
- Breadcrumb trail
- Table of contents
- Previous/Next navigation
- Code examples with syntax highlighting
- Copy button on code blocks

**Existing Templates**: `ComponentShowcaseTemplate`, `FeatureGuideTemplate`, `TutorialTemplate`, `GettingStartedTemplate`

**Status**: COMPLETE (100% compliance per audit)

**Pages**: 151 pages across `/docs/*` - ALL use existing templates

### 8. Legal

**Purpose**: Legal and policy documents

**Characteristics**:

- Simple content layout
- Last updated date
- Table of contents for long documents
- Print-friendly styling
- No interactive elements

**Pages**:
| Page | Path | Template Candidate | Notes |
|------|------|-------------------|-------|
| Terms of Service | `/terms` | TRUE | Legal boilerplate |
| Privacy Policy | `/privacy` | TRUE | Privacy boilerplate |
| Cookie Policy | `/cookies` | TRUE | Cookie boilerplate |
| Refund Policy | `/refund` | TRUE | Refund boilerplate |

### 9. Utility

**Purpose**: System and error pages

**Characteristics**:

- Centered content
- Icon + message
- Action button
- Minimal styling

**Existing Templates**: `error-pages` in `/templates/`

**Pages**:
| Page | Path | Template Candidate | Notes |
|------|------|-------------------|-------|
| 404 Not Found | `/not-found` | TRUE | Standard error |
| 500 Error | `/error` | TRUE | Server error |
| Maintenance | `/maintenance` | TRUE | Down for maintenance |
| Loading | `/loading` | TRUE | Global loading |
| Global Error | `/global-error` | ONE-OFF | Root error boundary |

---

## Template Contracts

### Contract 1: MarketingPageTemplate

**Applies to**: Marketing/Landing archetype

```typescript
interface MarketingPageTemplateProps {
  // Required
  title: string;
  description: string;

  // Optional sections
  hero?: {
    headline: string;
    subheadline: string;
    cta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    image?: string;
  };

  features?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;

  testimonials?: Array<{
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  }>;

  faq?: Array<{
    question: string;
    answer: string;
  }>;

  cta?: {
    headline: string;
    description: string;
    button: { label: string; href: string };
  };
}
```

**Layout Structure**:

```
┌─────────────────────────────────────────┐
│ Hero (full-width, optional bg)          │
├─────────────────────────────────────────┤
│ Features (grid: 2-4 cols)               │
├─────────────────────────────────────────┤
│ Testimonials (carousel or grid)         │
├─────────────────────────────────────────┤
│ FAQ (accordion)                         │
├─────────────────────────────────────────┤
│ CTA (full-width banner)                 │
└─────────────────────────────────────────┘
```

**Token Requirements**:

- Spacing: `space-y-24` between sections
- Container: `max-w-7xl`
- Typography: `text-4xl` hero, `text-2xl` section titles
- Colors: semantic tokens only

---

### Contract 2: AuthPageTemplate

**Applies to**: Auth archetype

```typescript
interface AuthPageTemplateProps {
  // Required
  title: string;
  description: string;

  // Form
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'password';
    placeholder?: string;
    required?: boolean;
  }>;

  submitLabel: string;

  // Optional
  socialAuth?: boolean;
  rememberMe?: boolean;

  // Links
  alternateLink?: {
    label: string;
    href: string;
  };

  forgotPasswordLink?: boolean;
}
```

**Layout Structure**:

```
┌─────────────────────────────────────────┐
│          Logo (centered)                │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │ Card (max-w-md, centered)       │    │
│  │ ┌─────────────────────────────┐ │    │
│  │ │ [ [0x00] TITLE ]            │ │    │
│  │ ├─────────────────────────────┤ │    │
│  │ │ Form Fields                 │ │    │
│  │ │ > SUBMIT                    │ │    │
│  │ │ ─────────────────────────── │ │    │
│  │ │ Social Auth (optional)      │ │    │
│  │ │ Alternate Link              │ │    │
│  │ └─────────────────────────────┘ │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

**Token Requirements**:

- Container: centered, `max-w-md`
- Card: `border border-border`, terminal header
- Buttons: `> UPPERCASE_SNAKE_CASE` format
- Labels: `[LABEL]:` format
- Spacing: `space-y-4` within form, `space-y-6` sections

---

### Contract 3: DashboardPageTemplate

**Applies to**: Dashboard archetype

```typescript
interface DashboardPageTemplateProps {
  // Required
  title: string;

  // Stats row
  stats?: Array<{
    label: string;
    value: string | number;
    change?: { value: number; direction: 'up' | 'down' };
    icon?: React.ReactNode;
  }>;

  // Main content
  children: React.ReactNode;

  // Optional
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;

  dateRange?: boolean;
}
```

**Layout Structure**:

```
┌─────────────────────────────────────────┐
│ Header: Title + Actions + Date Range    │
├─────────────────────────────────────────┤
│ Stats Grid (4 cols)                     │
│ ┌───────┬───────┬───────┬───────┐      │
│ │ Stat  │ Stat  │ Stat  │ Stat  │      │
│ └───────┴───────┴───────┴───────┘      │
├─────────────────────────────────────────┤
│ Main Content (flexible)                 │
│ - Charts                                │
│ - Activity feed                         │
│ - Quick actions                         │
└─────────────────────────────────────────┘
```

**Token Requirements**:

- Container: `max-w-6xl`
- Title: `text-4xl font-semibold tracking-tight`
- Stats: 4-column grid, `gap-6`
- Spacing: `space-y-6` main sections

---

### Contract 4: ListPageTemplate

**Applies to**: List/Table archetype

```typescript
interface ListPageTemplateProps<T> {
  // Required
  title: string;
  columns: ColumnDef<T>[];
  data: T[];

  // Toolbar
  searchPlaceholder?: string;
  filters?: Array<{
    key: string;
    label: string;
    options: { value: string; label: string }[];
  }>;

  // Actions
  createAction?: {
    label: string;
    onClick: () => void;
  };

  bulkActions?: Array<{
    label: string;
    onClick: (selected: T[]) => void;
    destructive?: boolean;
  }>;

  // Pagination
  pagination?: {
    pageSize: number;
    pageSizeOptions?: number[];
  };

  // Empty state
  emptyState?: {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: { label: string; onClick: () => void };
  };
}
```

**Layout Structure**:

```
┌─────────────────────────────────────────┐
│ Header: Title + Create Button           │
├─────────────────────────────────────────┤
│ Toolbar: Search + Filters + View Toggle │
├─────────────────────────────────────────┤
│ Table                                   │
│ ┌────┬───────────────────────┬──────┐  │
│ │ □  │ Column Headers        │ Acts │  │
│ ├────┼───────────────────────┼──────┤  │
│ │ □  │ Row data              │ ...  │  │
│ │ □  │ Row data              │ ...  │  │
│ │ □  │ Row data              │ ...  │  │
│ └────┴───────────────────────┴──────┘  │
├─────────────────────────────────────────┤
│ Pagination: Page info + Controls       │
└─────────────────────────────────────────┘

OR (empty state):

┌─────────────────────────────────────────┐
│ Header: Title + Create Button           │
├─────────────────────────────────────────┤
│         ┌───────────────┐               │
│         │     Icon      │               │
│         │    [EMPTY]    │               │
│         │  Description  │               │
│         │ > ADD_FIRST   │               │
│         └───────────────┘               │
└─────────────────────────────────────────┘
```

**Token Requirements**:

- Container: `max-w-6xl`
- Table: full-width, `border border-border`
- Headers: `font-medium text-xs`, `bg-muted`
- Cells: `text-sm`, `font-mono` for IDs/dates
- Actions: dropdown menu with icons

---

### Contract 5: DetailPageTemplate

**Applies to**: Detail/Object archetype

```typescript
interface DetailPageTemplateProps {
  // Required
  title: string;

  // Header
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'destructive';
  }>;

  // Content
  tabs?: Array<{
    value: string;
    label: string;
    content: React.ReactNode;
  }>;

  // Or direct content
  children?: React.ReactNode;

  // Sidebar
  metadata?: Array<{
    label: string;
    value: React.ReactNode;
  }>;
}
```

**Layout Structure**:

```
┌─────────────────────────────────────────┐
│ Breadcrumbs                             │
├─────────────────────────────────────────┤
│ Header: Title + Status + Actions        │
├───────────────────────────┬─────────────┤
│ Tabs (optional)           │ Metadata    │
├───────────────────────────┤ Sidebar     │
│                           │             │
│ Main Content              │ [STATUS]:   │
│ (tab content or children) │ Active      │
│                           │             │
│                           │ [CREATED]:  │
│                           │ 2025-01-01  │
│                           │             │
└───────────────────────────┴─────────────┘
```

**Token Requirements**:

- Container: `max-w-6xl`
- Title: `text-4xl font-semibold tracking-tight`
- Tabs: terminal-styled with `[ [0x00] TAB_NAME ]`
- Metadata: `font-mono text-xs` for values
- Sidebar: `w-80`, sticky on scroll

---

### Contract 6: SettingsPageTemplate

**Applies to**: Settings archetype

```typescript
interface SettingsPageTemplateProps {
  // Required
  title: string;

  // Navigation
  sections: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    isDanger?: boolean;
  }>;

  // Content
  children: React.ReactNode;

  // Actions
  onSave?: () => void;
  onReset?: () => void;
  saveLabel?: string;
}
```

**Layout Structure**:

```
┌─────────────────────────────────────────┐
│ Header: Title                           │
├─────────────────┬───────────────────────┤
│ Sidebar         │ Content Area          │
│                 │                       │
│ [x] General     │ ┌─────────────────┐   │
│ [ ] Security    │ │ Section Card    │   │
│ [ ] Notifications│ │                 │   │
│ [ ] Privacy     │ │ Form fields     │   │
│ [ ] Advanced    │ │                 │   │
│                 │ │ > SAVE          │   │
│ ─────────────── │ └─────────────────┘   │
│ [ ] Danger Zone │                       │
│                 │ ┌─────────────────┐   │
│                 │ │ Danger Zone     │   │
│                 │ │ (border-destructive) │
│                 │ └─────────────────┘   │
└─────────────────┴───────────────────────┘
```

**Token Requirements**:

- Container: `max-w-4xl`
- Sidebar: `w-64`, sticky
- Sections: cards with terminal headers
- Danger zone: `border-destructive` border
- Save: floating button or per-section

---

### Contract 7: LegalPageTemplate

**Applies to**: Legal archetype

```typescript
interface LegalPageTemplateProps {
  // Required
  title: string;
  lastUpdated: string;
  content: string | React.ReactNode;

  // Optional
  tableOfContents?: boolean;
  printButton?: boolean;
}
```

**Layout Structure**:

```
┌─────────────────────────────────────────┐
│ Header: Title + Last Updated            │
├───────────────────────┬─────────────────┤
│ Content               │ TOC (optional)  │
│                       │                 │
│ 1. Section            │ 1. Section      │
│    Content...         │ 2. Section      │
│                       │ 3. Section      │
│ 2. Section            │                 │
│    Content...         │                 │
│                       │                 │
└───────────────────────┴─────────────────┘
```

**Token Requirements**:

- Container: `max-w-4xl`
- Typography: prose styling with `font-sans`
- Headings: `font-mono` for section numbers
- TOC: sticky sidebar, `w-64`

---

### Contract 8: UtilityPageTemplate

**Applies to**: Utility archetype

```typescript
interface UtilityPageTemplateProps {
  // Required
  code: string; // e.g., "404", "500"
  title: string;
  description: string;

  // Actions
  primaryAction?: {
    label: string;
    href: string;
  };

  secondaryAction?: {
    label: string;
    href: string;
  };

  // Optional
  icon?: React.ReactNode;
  showHomeLink?: boolean;
}
```

**Layout Structure**:

```
┌─────────────────────────────────────────┐
│                                         │
│               ┌───────────┐             │
│               │   Icon    │             │
│               └───────────┘             │
│                                         │
│         [ ERROR_CODE: 404 ]             │
│                                         │
│           PAGE NOT FOUND                │
│                                         │
│     The page you're looking for         │
│        doesn't exist.                   │
│                                         │
│          > GO_HOME                      │
│          > GO_BACK                      │
│                                         │
└─────────────────────────────────────────┘
```

**Token Requirements**:

- Layout: centered, `min-h-screen`
- Icon: `h-16 w-16`, `text-muted-foreground`
- Code: `font-mono text-xs`, bracketed
- Title: `text-4xl font-bold`
- Buttons: terminal format

---

## Implementation Priority

### Phase 1: HIGH Priority (Core User Flows)

| Template              | Archetype     | Impact | Effort | Pages Affected |
| --------------------- | ------------- | ------ | ------ | -------------- |
| AuthPageTemplate      | Auth          | HIGH   | LOW    | 6              |
| ListPageTemplate      | List/Table    | HIGH   | MEDIUM | 15             |
| DashboardPageTemplate | Dashboard     | HIGH   | MEDIUM | 8              |
| DetailPageTemplate    | Detail/Object | HIGH   | MEDIUM | 10             |

**Rationale**: These templates cover the core authenticated experience and affect the most pages.

### Phase 2: MEDIUM Priority (Secondary Flows)

| Template              | Archetype | Impact | Effort | Pages Affected |
| --------------------- | --------- | ------ | ------ | -------------- |
| SettingsPageTemplate  | Settings  | MEDIUM | LOW    | 8              |
| MarketingPageTemplate | Marketing | MEDIUM | MEDIUM | 10             |
| LegalPageTemplate     | Legal     | LOW    | LOW    | 4              |

**Rationale**: Settings and marketing are important but have less traffic than dashboard/list pages.

### Phase 3: LOW Priority (Edge Cases)

| Template            | Archetype | Impact | Effort | Pages Affected |
| ------------------- | --------- | ------ | ------ | -------------- |
| UtilityPageTemplate | Utility   | LOW    | LOW    | 5              |

**Rationale**: Error pages are rarely seen and already have reasonable implementations.

### Already Complete

| Template                  | Status   | Notes                |
| ------------------------- | -------- | -------------------- |
| ComponentShowcaseTemplate | COMPLETE | Docs components      |
| FeatureGuideTemplate      | COMPLETE | Docs features        |
| TutorialTemplate          | COMPLETE | Docs tutorials       |
| GettingStartedTemplate    | COMPLETE | Docs getting started |

---

## One-Off Pages

The following pages are intentionally NOT templated due to unique requirements:

| Page                 | Path                  | Reason                             |
| -------------------- | --------------------- | ---------------------------------- |
| Component Showcase   | `/component-showcase` | Interactive demo, unique layout    |
| Visual Test          | `/visual-test`        | QA tool, special requirements      |
| Demo Pages           | `/demo/*`             | Experimental, frequently changing  |
| Global Error         | `/global-error.tsx`   | Root error boundary, minimal       |
| Purchase Flow        | `/purchase`           | Custom checkout UI                 |
| Success Confirmation | `/success`            | Post-purchase, unique celebrations |

---

## Migration Strategy

### Step 1: Create Templates

1. Build template components in `src/components/templates/`
2. Follow contracts defined above
3. Test with visual regression

### Step 2: Identify Quick Wins

Pages with highest compliance scores migrate first:

- All `/docs/*` pages (already complete)
- `/templates/*` pages (92% compliant)
- Auth pages (90% compliant)

### Step 3: Incremental Migration

For each template:

1. Create template component
2. Migrate 2-3 highest-compliance pages
3. Validate design system adherence
4. Roll out to remaining pages

### Step 4: Enforce Templates

Add ESLint rules to enforce template usage:

- `/docs/*` → must use Docs templates
- `/dashboard/*` → must use Dashboard/List/Detail/Settings templates
- `/auth/*` → must use Auth templates

---

## Metrics

### Current State

| Metric                   | Value           |
| ------------------------ | --------------- |
| Total pages              | 200+            |
| Pages using templates    | 151 (docs only) |
| Template coverage        | ~75%            |
| Design system compliance | 89% avg         |

### Target State

| Metric                   | Target |
| ------------------------ | ------ |
| Template coverage        | 95%+   |
| Design system compliance | 98%+   |
| One-off pages            | <10    |

---

## Appendix: Full Page Classification

See `templates-index.json` for machine-readable classification of all pages.

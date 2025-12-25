# Template Gallery

Production-ready page templates for common SaaS use cases. Each template is fully functional, responsive, and built with the same components and design system used throughout the boilerplate.

## Overview

The Fabrk boilerplate includes **28 copy-paste ready templates** organized into 4 categories:

- **Dashboards** (3 templates)
- **Admin Panels** (1 template)
- **Account Pages** (3 templates)
- **Marketing** (2 templates)

All templates follow the Neo-Brutalism design system with:

- 2px bold borders
- Hard shadows
- Bold typography (font-weight: 700)
- OKLCH color system
- Full mobile responsiveness

## Template List

### Dashboards

#### 1. Analytics Dashboard

**Path:** `/templates/analytics-dashboard`
**File:** `src/app/templates/analytics-dashboard/page.tsx`

A comprehensive analytics dashboard with data visualization and metrics tracking.

**Features:**

- 4 metric cards with trend indicators (+12.3%, -2.1%, etc.)
- Revenue chart (6-month line graph)
- Recent activity feed with timestamps
- Top pages table with pageviews/bounce rate
- Traffic sources with progress bars
- Device breakdown statistics
- Tabbed interface (Overview, Reports, Insights)
- Export functionality

**Use Cases:**

- SaaS product analytics
- Marketing dashboard
- E-commerce insights
- User behavior tracking

**Key Components:**

- `Card`, `CardHeader`, `CardContent`
- `Tabs`, `TabsList`, `TabsTrigger`
- `Table`, `TableHeader`, `TableBody`
- `Progress` bars
- `Button` with variants

---

#### 2. Team Dashboard

**Path:** `/templates/team-dashboard`
**File:** `src/app/templates/team-dashboard/page.tsx`

Multi-tenancy team management interface with role-based access control.

**Features:**

- Team member table with avatars and roles
- Role hierarchy (Owner > Admin > Member > Guest)
- Invite form with role selection
- Pending invitations list
- Activity feed with user actions
- Role-based permissions display
- Last active timestamps

**Use Cases:**

- Organization management
- Project collaboration tools
- Agency/client portals
- Enterprise team workspaces

**Key Concepts:**

- RBAC (Role-Based Access Control)
- Multi-tenancy patterns
- User invitation flows
- Activity logging

---

#### 3. Chart Library

**Path:** `/templates/chart-library`
**File:** `src/app/templates/chart-library/page.tsx`

Data visualization showcase using Recharts library.

**Features:**

- Line charts (multi-series with tooltips)
- Area charts (stacked and gradient fills)
- Bar charts (grouped and stacked)
- Pie/Donut charts (with percentages)
- Custom tooltips with Neo-Brutalism styling
- Responsive containers
- Legend customization
- Mock data included

**Dependencies:**

- `recharts` (installed via npm)

**Use Cases:**

- Financial dashboards
- Performance metrics
- KPI tracking
- Data reporting tools

**Chart Types:**

- `LineChart` - Trend analysis
- `AreaChart` - Volume visualization
- `BarChart` - Comparative data
- `PieChart` - Distribution/proportions

---

### Admin Panels

#### 4. User Management

**Path:** `/templates/user-management`
**File:** `src/app/templates/user-management/page.tsx`

Complete user administration panel with TanStack Table v8.

**Features:**

- User table with 10 sample users
- Sorting (name, email, role, status, created date)
- Filtering (search by name, filter by role/status/plan)
- Pagination (78/78/78/78 rows per page)
- Bulk actions (select multiple users)
- Action menu per user (Edit, Reset Password, Suspend, Delete)
- Status badges (Active, Inactive, Suspended)
- Plan badges (Free, Pro, Enterprise)
- Role badges (Admin, User, Guest)

**Use Cases:**

- SaaS admin panels
- Customer management
- Internal tools
- CRM systems

**Key Libraries:**

- `@tanstack/react-table` v8
- Full TypeScript support
- Column filtering and sorting
- Pagination controls

---

### Account Pages

#### 5. Settings Page

**Path:** `/templates/settings-page`
**File:** `src/app/templates/settings-page/page.tsx`

Comprehensive settings interface with 4-tab navigation.

**Features:**

- **General Tab:**
  - Appearance settings (theme switcher)
  - Notification preferences
  - Language selection
  - Timezone configuration

- **Account Tab:**
  - Profile information
  - Email management
  - Account deletion

- **Privacy Tab:**
  - Data visibility controls
  - Marketing preferences
  - Cookie settings
  - Privacy exports

- **Billing Tab:**
  - Current plan display
  - Usage metrics
  - Upgrade/downgrade options
  - Payment method management

**Use Cases:**

- User preferences
- Account configuration
- Privacy controls
- Subscription management

**Integrates:**

- `AppearanceForm`
- `NotificationForm`
- `ProfileForm`
- `PrivacyForm`

---

#### 6. Billing Dashboard

**Path:** `/templates/billing-dashboard`
**File:** `src/app/templates/billing-dashboard/page.tsx`

Payment and subscription management interface.

**Features:**

- **Overview Tab:**
  - Current plan card (Starter/Professional/Enterprise)
  - Usage tracking with progress bars
  - Billing cycle information
  - Quick actions (Upgrade, Manage, Cancel)

- **Plans Tab:**
  - All available tiers with pricing
  - Feature comparison
  - Upgrade/downgrade buttons
  - Annual vs monthly toggle

- **History Tab:**
  - Payment history table
  - Invoice downloads
  - Transaction status
  - Date and amount tracking

**Use Cases:**

- SaaS billing portals
- Subscription management
- Payment history
- Plan upgrades/downgrades

**Payment Methods:**

- Saved card display (last 4 digits)
- Add new payment method
- Set default card
- Remove cards

---

#### 7. Security & Privacy

**Path:** `/templates/security-privacy`
**File:** `src/app/templates/security-privacy/page.tsx`

Complete security dashboard with GDPR compliance.

**Features:**

- **Security Tab:**
  - Security score (0-100%)
  - Two-factor authentication setup (TOTP)
  - OAuth connections (Google, GitHub)
  - Active sessions viewer
  - Password change form

- **Privacy Tab:**
  - Data visibility controls
  - Cookie preferences
  - Marketing opt-in/out
  - Third-party data sharing settings

- **Audit Log Tab:**
  - User activity timeline
  - Login history
  - Setting changes
  - Security events
  - IP address tracking

- **Compliance Tab:**
  - GDPR data export
  - Data deletion requests
  - Privacy policy acceptance
  - Consent management

**Use Cases:**

- Enterprise security settings
- GDPR/CCPA compliance
- User privacy controls
- Security auditing

**Security Features:**

- 2FA with QR codes
- Session management
- OAuth provider linking
- Activity logging

---

### Marketing

#### 8. Email Templates

**Path:** `/templates/email-templates`
**File:** `src/app/templates/email-templates/page.tsx`

Interactive showcase of transactional email templates.

**Features:**

- Live preview (iframe rendering)
- Code view toggle (HTML/Preview)
- Copy code functionality
- 5 email templates included:
  1. Welcome Email (onboarding)
  2. Password Reset (security)
  3. Payment Receipt (billing)
  4. Team Invitation (collaboration)
  5. Account Verification (auth)

**Use Cases:**

- Email system documentation
- Template customization
- Transactional email design
- Resend/SendGrid integration

**Templates Included:**

- Welcome message with CTA
- Password reset with secure link
- Payment confirmation with invoice
- Team invite with accept button
- Verification email with token

---

#### 9. Documentation Layout

**Path:** `/templates/documentation-layout`
**File:** `src/app/templates/documentation-layout/page.tsx`

3-column documentation site architecture.

**Features:**

- **Left Sidebar:**
  - Nested navigation (4 sections, 15+ pages)
  - Section icons
  - Active page highlighting
  - Badge support (Popular, Important, New)

- **Main Content:**
  - Breadcrumb navigation
  - Markdown-style content parsing
  - Syntax-highlighted code blocks
  - Copy code functionality
  - Previous/Next page navigation
  - Last updated timestamp

- **Right Sidebar (TOC):**
  - On-page navigation
  - Anchor links to headings
  - Smooth scrolling

**Use Cases:**

- Product documentation
- Developer docs
- API reference
- Knowledge base

**Content Features:**

- Markdown parsing (headings, paragraphs, code blocks)
- Language syntax badges
- Copy-to-clipboard
- Mobile-responsive with collapsible sidebar

---

## How to Use Templates

### 1. Copy-Paste Method

Each template is self-contained in a single file. To use:

```bash
# Copy template to your desired location
cp src/app/templates/analytics-dashboard/page.tsx src/app/dashboard/page.tsx

# Update imports if needed (they're all relative to @/)
# Customize content, data, and styling
```

### 2. Reference Implementation

Use templates as reference for building your own pages:

- Study component composition patterns
- Copy specific sections (tables, charts, forms)
- Adapt layouts to your needs
- Mix and match features

### 3. Starting Point

Start with a template and build on it:

- Replace mock data with real API calls
- Add authentication checks
- Integrate with your database
- Customize styling and branding

## Common Patterns

### Data Tables

Templates use TanStack Table v8 for complex data:

```typescript
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

const table = useReactTable({
  data: users,
  columns,
  getCoreRowModel: getCoreRowModel(),
  // ... additional features
});
```

### Tabbed Interfaces

Most templates use Radix UI Tabs:

```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
</Tabs>
```

### Mock Data

All templates include realistic mock data for demonstration:

- 10+ user records (User Management)
- 6 months of revenue data (Charts)
- 50 payment transactions (Billing)
- 20 activity events (Audit Log)

Replace with real data from your API/database.

## Dependencies

### Core Dependencies (Already Installed)

- `@tanstack/react-table` - Data tables
- `@radix-ui/*` - UI components
- `lucide-react` - Icons
- `tailwindcss` - Styling

### Additional Dependencies

- `recharts` - Charts and data visualization (installed for Chart Library template)

## Customization Guide

### Changing Colors

All templates use CSS variables from `globals.css`:

```css
--primary: oklch(70.28% 0.1753 295.36);
--destructive: oklch(65.69% 0.2768 29.23);
```

Change theme colors in one place, all templates update automatically.

### Replacing Mock Data

Search for `mock` in each template file:

```typescript
// BEFORE (mock data)
const mockUsers = [{ id: '1', name: 'John Doe', email: 'john@example.com' }];

// AFTER (real data)
const { data: users } = await fetch('/api/users');
```

### Adding Authentication

Wrap template content with auth checks:

```typescript
import { auth } from '@/lib/auth';

export default async function ProtectedTemplate() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  // ... template content
}
```

### Mobile Responsiveness

All templates use Tailwind responsive classes:

```typescript
className = 'grid md:grid-cols-2 lg:grid-cols-4 gap-6';
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 4 columns
```

## File Structure

```
src/app/templates/
├── README.md                           # This file
├── page.tsx                            # Template gallery index
├── analytics-dashboard/page.tsx        # Analytics template
├── team-dashboard/page.tsx             # Team template
├── chart-library/page.tsx              # Charts template
├── user-management/page.tsx            # User admin template
├── settings-page/page.tsx              # Settings template
├── billing-dashboard/page.tsx          # Billing template
├── security-privacy/page.tsx           # Security template
├── email-templates/page.tsx            # Email showcase
└── documentation-layout/page.tsx       # Docs template
```

## Testing Templates

### View in Development

```bash
npm run dev
# Visit http://localhost:3000/templates
# Click any template to see live preview
```

### Build for Production

```bash
npm run build
# All templates are statically rendered
# No runtime dependencies required
```

## Best Practices

1. **Start Simple**: Begin with the closest template to your use case
2. **Replace Mock Data Early**: Connect to real APIs to test data flow
3. **Maintain Design Consistency**: Keep Neo-Brutalism styling across your app
4. **Test Responsiveness**: Check mobile, tablet, and desktop views
5. **Add Loading States**: Templates show static data - add skeleton loaders
6. **Error Handling**: Add try-catch blocks for API calls
7. **Accessibility**: Templates use semantic HTML - maintain ARIA labels

## Component Dependencies

All templates rely on shared UI components from `/components/ui/`:

- `button.tsx`
- `card.tsx`
- `input.tsx`
- `table.tsx`
- `tabs.tsx`
- `badge.tsx`
- `progress.tsx`
- `select.tsx`
- `separator.tsx`
- `avatar.tsx`

These components are part of the Radix UI + Tailwind setup.

## Support

- **Documentation**: See main README.md and CLAUDE.md
- **Component Reference**: Visit `/components` page
- **Live Demos**: Visit `/templates` gallery
- **Code Examples**: Each template is fully commented

## Future Templates (Roadmap)

Potential additions based on user feedback:

- Kanban Board (project management)
- Calendar View (scheduling)
- Chat Interface (messaging)
- File Manager (document storage)
- Pricing Calculator (dynamic pricing)
- Onboarding Flow (multi-step wizard)

Submit template requests via GitHub issues.

---

**Version**: 1.0.0
**Last Updated**: November 2024
**License**: Included with Fabrk Boilerplate

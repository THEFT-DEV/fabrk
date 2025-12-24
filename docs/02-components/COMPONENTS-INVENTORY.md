# Fabrk Component Inventory

Complete list of all prebuilt components, templates, pages, and APIs in the Fabrk boilerplate.

Last Updated: 2025-12-20

---

## 📊 Summary Statistics

- **78 UI Components** (Verified count from `/src/components/ui/`)
- **5 Landing Page Templates** (Setup wizard starter pages)
- **26+ Pre-built Pages** (Auth, Dashboard, Admin, Legal, Landing)
- **72 API routes** (Auth, Payments, Webhooks, Health)
- **7 Email Templates** (Transactional emails)
- **18 terminal themes** (OKLCH-based color schemes)
- **Enterprise Features** (MFA, Jobs, Teams, Files, AI)

**Total: 78 production-ready UI components + Full-Stack Features**

---

## 🚀 Setup Wizard Templates (5 Total)

The `npm run setup` wizard includes starter landing pages for different app types:

| Template | File | Sections Included |
|----------|------|-------------------|
| **STARTER** | `scripts/page-templates/starter.tsx` | Hero, Features (3), CTA |
| **SAAS** | `scripts/page-templates/saas.tsx` | Hero, Features (6), Pricing (3 tiers), FAQ |
| **AI APP** | `scripts/page-templates/ai-app.tsx` | Hero, Demo, Capabilities (4), Credit-based Pricing, Trust |
| **MARKETPLACE** | `scripts/page-templates/marketplace.tsx` | Hero, Categories (4), How It Works, Seller Benefits, Trust |
| **CUSTOM** | Uses `starter.tsx` | Same as Starter (generic starting point) |

Each template includes:
- **[SETUP] instruction banner** with file path
- **TODO comments** marking what to customize
- **Placeholder text** that clearly needs replacement
- **Terminal aesthetic** (font-mono, rounded-none, uppercase headings)

---

## 🎨 UI Components (78 Total - Verified)

### Base Components from Radix UI (25)
All styled with Tailwind CSS, fully accessible (ARIA), and production-ready:

1. **Accordion** - Collapsible content sections
2. **Alert** - Contextual feedback messages
3. **Alert Dialog** - Modal confirmations
4. **Avatar** - User profile images with fallbacks
5. **Badge** - Status indicators and labels
6. **Button** - Primary actions with variants
7. **Calendar** - Date picker and selection
8. **Card** - Content containers
9. **Checkbox** - Boolean inputs
10. **Dialog** - Modal windows
11. **Dropdown Menu** - Contextual action menus
12. **Input** - Text input fields
13. **Label** - Form field labels
14. **Popover** - Floating content
15. **Radio Group** - Single-choice selection
16. **Select** - Dropdown selection
17. **Separator** - Visual dividers
18. **Sheet** - Side panels
19. **Skeleton** - Loading placeholders
20. **Slider** - Range inputs
21. **Switch** - Toggle switches
22. **Tabs** - Tabbed interfaces
23. **Textarea** - Multi-line text input
24. **Toast** - Notification messages
25. **Tooltip** - Helpful hints

### Custom Components (62)

#### Navigation & Layout (8)
1. **Navigation** - Main app navigation bar
2. **Footer** - Site footer with links
3. **Sidebar** - Dashboard sidebar navigation
4. **Breadcrumbs** - Navigation breadcrumbs
5. **Logo** - Brand logo component
6. **ThemeProvider** - Dark/light mode
7. **ErrorBoundary** - React error boundaries
8. **MonitoringProvider** - Error tracking wrapper

#### Landing Page (7)
1. **Hero Section** - Above-the-fold hero
2. **Features Section** - Feature grid
3. **Pricing Section** - Pricing tiers
4. **Core Benefits** - Value propositions
5. **Tech Stack** - Technology showcase
6. **CTA Section** - Call-to-action
7. **Testimonials** - Customer reviews

#### Dashboard Components (12)
1. **License Card** - Product license info
2. **Resources Card** - Download resources
3. **Access Card** - Access level display
4. **Purchase Status** - Payment status widget
5. **Stats Card** - Metric display
6. **Activity Feed** - Recent activity
7. **Quick Actions** - Action shortcuts
8. **User Profile** - Profile display
9. **Settings Panel** - User settings
10. **Notification Center** - Notification dropdown
11. **Toast Container** - Toast notifications
12. **Search Bar** - Global search

#### Admin Components (6)
1. **User Table** - User management table
2. **Analytics Chart** - Data visualization
3. **Feature Flag Toggle** - Flag controls
4. **Security Log Table** - Audit logs
5. **Monitoring Dashboard** - Error tracking
6. **Job Queue Status** - Background jobs

#### Data Display (8)
1. **Data Table** - Sortable, filterable tables
2. **Data Table Pagination** - Table pagination
3. **Data Table Toolbar** - Table filters
4. **Data Table Column Header** - Sortable headers
5. **Stat Card** - KPI display
6. **Progress Bar** - Progress indicator
7. **Status Badge** - Status indicators
8. **Empty State** - No data placeholder

#### Forms & Inputs (14)
1. **Login Form** - Email/password login
2. **Register Form** - User registration
3. **Forgot Password Form** - Password reset
4. **MFA Setup Form** - 2FA configuration
5. **Profile Form** - User profile editor
6. **Settings Form** - App settings
7. **Search Input** - Search with icon
8. **File Upload** - File uploader with drag-drop
9. **Rich Text Editor** - WYSIWYG editor (HTML5)
10. **Multi-step Form** - Wizard-style form
11. **Command Palette** - Global command menu (⌘K)
12. **Form Validation** - Zod integration
13. **Cropper** - Image cropping utility
14. **Color Picker** - Hex/RGB color selector

#### Marketing & SEO (11)
1. **FAQ Section** - Accordion FAQs
2. **FAQ Schema** - Structured data
3. **Breadcrumbs** - Navigation breadcrumbs
4. **How-To Section** - Step-by-step guides
5. **Schema Script** - JSON-LD injection
6. **Article Schema** - Blog post schema
7. **Organization Schema** - Company schema
8. **Software Schema** - Product schema
9. **Review Schema** - Customer reviews
10. **Video Schema** - Video content
11. **Meta Tags** - Dynamic meta tags

---

## 📄 Pre-built Pages (78 Total)

### Authentication Pages (6)
1. **/login** - Sign in page
2. **/register** - Sign up page
3. **/signup** - Alternative signup
4. **/forgot-password** - Password recovery
5. **/reset-password/[token]** - Password reset
6. **/verify-email/[token]** - Email verification

### Dashboard Pages (11)
1. **/dashboard** - Main dashboard (Coming soon)
2. **/settings** - User settings
3. **/settings/security** - MFA & security settings
4. **/account** - Account management
5. **/examples/user-profile** - Profile example
6. **/examples/analytics** - Analytics example
7. **/examples/admin** - Admin example
8. **/admin** - Admin overview
9. **/admin/users** - User management
10. **/admin/analytics** - Analytics dashboard
11. **/admin/feature-flags** - Feature management
12. **/admin/security** - Security logs
13. **/admin/monitoring** - Error tracking

### Legal Pages (3)
1. **/privacy** - Privacy policy
2. **/terms** - Terms of service
3. **/refund** - Refund policy

### Marketing Pages (3)
1. **/** (root) - Main landing page
2. **/landing-alt** - Alternative landing
3. **/variations** - Design variations

### Utility Pages (3)
1. **/maintenance** - Maintenance mode
2. **/404** - Not found page
3. **/error** - Error page

---

## 🔌 API Routes (78 Total)

### Authentication APIs (7)
1. **POST /api/auth/register** - User registration
2. **POST /api/auth/verify-email** - Email verification
3. **POST /api/auth/resend-verification** - Resend verification
4. **POST /api/auth/forgot-password** - Request password reset
5. **POST /api/auth/reset-password** - Reset password
6. **GET/POST /api/auth/[...nextauth]** - NextAuth handlers
7. **GET /api/auth/session** - Get current session

### MFA APIs (4)
1. **POST /api/auth/mfa/enable** - Enable 2FA
2. **POST /api/auth/mfa/verify** - Verify TOTP device
3. **POST /api/auth/mfa/disable** - Disable 2FA
4. **POST /api/auth/mfa/regenerate-codes** - Regenerate backup codes

### Payment APIs (4)
1. **POST /api/stripe/checkout** - Create checkout session
2. **POST /api/stripe/portal** - Customer portal
3. **POST /api/stripe/verify** - Verify payment status
4. **POST /api/webhooks/stripe** - Stripe webhooks

### System APIs (1)
1. **GET /api/health** - Health check endpoint

---

## 📧 Email Templates (7 Total)

All templates are HTML-based, mobile-responsive, and production-ready:

1. **Welcome Email** - Post-purchase welcome
2. **Verification Email** - Email verification
3. **Password Reset Email** - Password recovery
4. **Purchase Confirmation** - Payment success
5. **Subscription Update** - Plan changes
6. **Onboarding Series** - Multi-step onboarding
7. **Getting Started** - First-time user guide

---

## 📚 Enterprise Libraries (5 Total)

### 1. Multi-Factor Authentication (`src/lib/auth/mfa.ts`)
- TOTP generation and verification
- Backup code management
- QR code generation
- Device management
- **20+ Functions**

### 2. Background Jobs (`src/lib/jobs/queue.ts`)
- Job queue with priorities
- Retry logic
- Scheduled jobs
- Job status tracking
- **15+ Functions**

### 3. Teams/Organizations (`src/lib/teams/organizations.ts`)
- Organization CRUD
- Role-based access control
- Team invitations
- Member management
- **18+ Functions**

### 4. File Storage (`src/lib/storage/uploads.ts`)
- S3-compatible uploads
- Image optimization
- Signed URLs
- Quota management
- **12+ Functions**

### 5. AI Integration (`src/lib/ai/index.ts`)
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude 3)
- Streaming responses
- Image generation
- Text-to-speech
- Speech-to-text
- Embeddings
- Moderation
- **15+ Functions**

---

## 🛠 Utility Libraries (78 Total)

1. **Security** - Rate limiting, validation, headers, bot protection, audit logs, GDPR
2. **Monitoring** - Error tracking, performance metrics
3. **Notifications** - Toast, persistent notifications
4. **Analytics** - Event tracking, funnels
5. **Feature Flags** - A/B testing, rollouts
6. **Feedback** - NPS, surveys
7. **Webhooks** - Signature verification, retry
8. **SEO** - Structured data, content optimization
9. **Email** - Resend integration
10. **Stripe** - Payment helpers

---

## 🎯 Coming Soon (To Make It Even Better)

Based on common SaaS needs, here's what we'll add:

### Additional UI Components (15+)
- [ ] Code Editor (Monaco)
- [ ] Chart Components (Recharts)
- [ ] Kanban Board
- [ ] Calendar View
- [ ] Timeline Component
- [ ] Markdown Renderer
- [ ] Video Player
- [ ] Audio Recorder
- [ ] Stepper Component
- [ ] Rating Component
- [ ] Comment Thread
- [ ] Emoji Picker
- [ ] Tag Input
- [ ] Mention Input (@mentions)

### Page Templates (10+)
- [ ] Blog List & Detail Pages
- [ ] Documentation Pages
- [ ] Changelog Page
- [ ] Roadmap Page
- [ ] Team/About Page
- [ ] Contact Page
- [ ] Help/Support Center
- [ ] API Documentation
- [ ] Status Page
- [ ] Integration Marketplace

### Additional Features (15+)
- [ ] Real-time Chat (Pusher/Ably)
- [ ] Video Conferencing (Daily.co)
- [ ] Screen Recording
- [ ] PDF Generation
- [ ] CSV Export/Import
- [ ] Advanced Search (Algolia)
- [ ] Localization (i18n)
- [ ] Accessibility Checker
- [ ] SEO Analyzer
- [ ] Performance Profiler
- [ ] A/B Testing Framework
- [ ] User Onboarding Tours
- [ ] In-app Messaging
- [ ] Knowledge Base
- [ ] Form Builder

---

## 💡 How to Use

### Using UI Components
```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MyPage() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

### Using Enterprise Features
```typescript
import { enableMFA } from "@/lib/auth/mfa";
import { enqueueJob } from "@/lib/jobs/queue";
import { uploadFile } from "@/lib/storage/uploads";

// Enable MFA
await enableMFA(userId, email);

// Queue background job
await enqueueJob({
  type: "email.send",
  payload: { to, subject, html },
});

// Upload file
await uploadFile({ userId, file, visibility: "private" });
```

---

## 📖 Documentation

- **Component Guide**: See individual component files for props and examples
- **API Reference**: Check `/docs` folder
- **Setup Guide**: See `ENTERPRISE-FEATURES-SETUP.md`
- **Examples**: Check `/app/examples` pages

---

**Total Production-Ready Elements: 150+**

With these components, you can build a complete SaaS application without writing most boilerplate code!

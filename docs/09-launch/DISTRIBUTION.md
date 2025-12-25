# Fabrk Distribution & Delivery Guide

**For SaaS Product Managers & Sales Teams**

This guide explains how Fabrk is packaged, delivered, and licensed for customers.

---

## 1. Distribution Model

### 1.1 Delivery Mechanism

Fabrk uses a **private GitHub repository** model:

#### Customer Receives:
1. **Private GitHub Repository Access** (via GitHub Teams or Organizations)
   - Full source code
   - Version history and all branches
   - Issues, pull requests, and discussions
   - CI/CD workflows and automation
   - Detailed commit messages and documentation

2. **Initial Setup Support** (included)
   - Email: support@fabrk.dev
   - Discord community access
   - Onboarding checklist (docs/ONBOARDING-CHECKLIST.md)
   - Custom domain for their documentation wiki (if needed)

3. **Documentation Bundle** (included)
   - 400KB+ comprehensive guides
   - 24+ deployment/feature/security documents
   - API reference documentation
   - Video tutorials (roadmap)

4. **Commercial License** (LICENSE.md)
   - Perpetual license (one-time purchase)
   - Or annual subscription
   - See LICENSE.md for complete terms

---

### 1.2 Post-Purchase Access

**How customers access the code:**

```
1. Purchase at https://fabrk.dev/buy
   ↓
2. Receive email with:
   - GitHub invitation link
   - License key (for record-keeping)
   - Onboarding checklist (docs/ONBOARDING-CHECKLIST.md)
   - Support contact info
   ↓
3. Accept GitHub invitation
   ↓
4. Clone repository: git clone https://github.com/[org]/fabrk_plate.git
   ↓
5. Follow ONBOARDING-CHECKLIST.md
   ↓
6. Deploy to production
```

---

## 2. What's Included vs. Excluded

### 2.1 Included in Distribution

✅ **Always Included:**
- `/src` - Complete source code (477 files)
- `/docs` - Full documentation (400KB+)
- `/tests` - Test suite (1500+ tests)
- `/prisma` - Database schema
- `/scripts` - Utility scripts
- `.github/workflows` - CI/CD configuration
- `.storybook` - Component library setup
- `public/` - Static assets
- All configuration files (tsconfig.json, next.config.ts, etc.)

✅ **Code Examples:**
- 28 copy-paste templates (marketing, dashboards, auth, settings)
- Storybook stories for all 78+ components
- Example Stripe setup
- Example email templates

✅ **Optional Premium Content:**
- Video tutorials (if purchased)
- Private Discord channel (if team plan)
- Priority support (if enterprise plan)

### 2.2 Excluded from Distribution

❌ **Not Included:**
- `/Boilerplate` - Competitor analysis (our internal reference only)
- `/agent-tools` - Internal AI tooling (not part of product)
- `/.mcp` - Claude MCP integration (developer tool, not needed for SaaS)
- `/sample_landing` - Internal reference materials
- Various internal docs and notes

**Rationale:** These are internal development tools, not part of the customer product.

### 2.3 Files to Clean Before Delivery

These should be removed or replaced in customer repository:

```
Remove:
  ❌ .DS_Store (macOS junk)
  ❌ node_modules/ (rebuilt with npm install)
  ❌ .next/ (rebuilt with npm run build)
  ❌ dist/ (rebuilt with npm run build)
  ❌ coverage/ (rebuilt with npm test)
  ❌ playwright-report/ (rebuilt with npm run test:e2e)
  ❌ .env.local, .env.production.local (sensitive)
  ❌ .git/config (private fork config)

Keep:
  ✅ .gitignore (working as designed)
  ✅ .github/workflows (CI/CD automation)
  ✅ All source code
  ✅ All documentation
  ✅ All configurations
```

---

## 3. Licensing & Legal

### 3.1 License Types Offered

**Option A: Perpetual License (Most Popular)**
- **Price:** $299 USD (one-time)
- **License Type:** Non-exclusive, non-transferable
- **Duration:** Forever (perpetual)
- **Updates:** v1.0.x free, v2.0+ requires new license
- **Best for:** Solo founders, small teams, MVP validation

**Option B: Annual Subscription**
- **Price:** $99 USD/year
- **License Type:** Non-exclusive, non-transferable
- **Duration:** 1 year (renews automatically)
- **Updates:** All minor & major versions included
- **Includes:** Priority support, email access
- **Best for:** Ongoing use, frequent updates needed

**Option C: Enterprise License**
- **Price:** Custom (contact sales)
- **Features:** Perpetual + source code modifications, custom training
- **Includes:** On-call support, custom contracts
- **Best for:** Large teams, regulated industries (HIPAA, etc.)

**Option D: Team License**
- **Price:** $199 USD/year
- **Features:** Up to 5 team members, private Slack channel
- **Includes:** Team onboarding, weekly checkins
- **Best for:** Startups, distributed teams

### 3.2 License Restrictions

**Permitted:**
- ✅ Modify code for your SaaS product
- ✅ Deploy to production
- ✅ Use for commercial purposes
- ✅ Customize branding, features, design
- ✅ Internal company use
- ✅ One production instance + one staging

**Prohibited:**
- ❌ Redistribute source code to third parties
- ❌ Resell the boilerplate (white-label, agencies)
- ❌ Use for SaaS consulting/services without enterprise license
- ❌ Remove copyright notices
- ❌ Use as basis for competing boilerplate

**See LICENSE.md for complete terms.**

---

## 4. Support & SLA

### 4.1 Support Levels

| Plan | Response Time | Channels | Included |
|------|---|---|---|
| **Standard** | 24 hours | Email + Discord | ✅ All licenses |
| **Team** | 12 hours | Email + Discord + Slack | ✅ Team license |
| **Enterprise** | 4 hours | Email + Slack + Phone | ✅ Enterprise license |

### 4.2 What's Covered

**Included Support:**
- Setup & onboarding questions
- Feature documentation & usage
- General troubleshooting
- Deployment guidance
- Best practices advice

**Not Covered:**
- ❌ 24/7 support (use managed services for that)
- ❌ Custom feature development (beyond SaaS use)
- ❌ Hosting/infrastructure troubleshooting (your responsibility)
- ❌ Customer support for their app (your responsibility)

---

## 5. Update & Maintenance Policy

### 5.1 Version Support

| Version | Status | Support Until |
|---------|--------|---|
| v1.0.x | Stable | 6 months after v2.0 release |
| v2.0.x | Latest | 12 months (rolling window) |

### 5.2 Update Access

**Perpetual License:**
- ✅ Free updates: v1.0.0 → v1.0.1, v1.0.2, etc. (patches)
- ✅ Free updates: v1.0.x → v1.1.0 (minor versions)
- ❌ Paid upgrade: v1.x → v2.0 (major versions)

**Annual License:**
- ✅ Free updates: All versions during subscription year
- ❌ After cancellation: Stuck on last version during subscription

**Enterprise License:**
- ✅ All updates included (perpetual or annual, depending on contract)
- ✅ Custom maintenance agreements available

### 5.3 How Updates Work

**Option 1: Git Pull (Recommended)**
```bash
git pull origin main  # Get latest updates
npm install          # Install dependency updates
npm run db:push     # Run any database migrations
```

**Option 2: Merge with Custom Branch**
```bash
git fetch origin
git merge origin/main --strategy=recursive  # Merge with your changes
# Resolve conflicts manually
```

**Caution:** Pulling updates may conflict with custom changes. Test in staging first.

---

## 6. GitHub Repository Setup

### 6.1 Repository Access Model

**Private Repository (Recommended):**
- Each customer gets access to their own private fork or organization
- Or: One shared repository with team/role access control
- **Advantage:** Clean separation, no visibility between customers

**Shared Organization Repository:**
- All customers access same read-only repository
- Updates propagated to everyone automatically
- **Advantage:** Simpler management, everyone on same version
- **Disadvantage:** Less control for individual customers

**Implementation:** Create GitHub organization per customer:
```
Organization: fabrk-[customer-name]
Repository: fabrk_plate (private)
Members: Added based on license level
```

### 6.2 Permission Levels

**Perpetual/Annual License:**
- Role: **Collaborator** (push + pull)
- Permissions: Read, push to branches, manage PRs

**Team License:**
- Role: **Maintainer** (full control except settings)
- Permissions: All above + manage issues, reviews, branch protection

**Enterprise License:**
- Role: **Owner** or **Admin**
- Permissions: Everything (full control)

### 6.3 Branch Structure

```
main
  ├── stable (stable releases only)
  ├── staging (pre-release testing)
  └── develop (development branch)

[customer-branches]
  ├── customizations (customer-specific changes)
  └── production (production deployment)
```

---

## 7. Delivery Workflow

### 7.1 Pre-Delivery Checklist

Before sending code to customer:

```
Code Preparation:
  [ ] Remove node_modules/ (rebuilt with npm install)
  [ ] Remove .next/, dist/, coverage/ (rebuild artifacts)
  [ ] Remove .env.local, .env.production.local (sensitive)
  [ ] Remove .DS_Store, Thumbs.db (OS junk)
  [ ] Verify .gitignore is correct
  [ ] Update README.md with setup instructions
  [ ] Clean up any debug console.logs
  [ ] Verify TypeScript compiles (npm run type-check)

Documentation:
  [ ] Include ONBOARDING-CHECKLIST.md
  [ ] Include QUICK-START.md
  [ ] Include all docs/ files
  [ ] Include LICENSE.md (their copy)
  [ ] Include SECURITY.md (security policy)

Configuration:
  [ ] Include .env.example with comments
  [ ] Include prisma/schema.prisma
  [ ] Include .github/workflows for CI/CD
  [ ] Include all config files

Testing:
  [ ] npm run type-check passes
  [ ] npm run lint passes
  [ ] npm run build succeeds
  [ ] All critical tests pass

License & Legal:
  [ ] License key provided
  [ ] LICENSE.md included
  [ ] Invoice/receipt sent
  [ ] Account setup email sent
```

### 7.2 Delivery Email Template

```
Subject: Welcome to Fabrk! 🚀 Your Source Code Access

Hi [Customer Name],

Thanks for purchasing Fabrk! Your license is now active.

QUICK START:
1. Accept GitHub invitation: [link]
2. Clone repository: git clone [repo-url]
3. Read ONBOARDING-CHECKLIST.md
4. npm install && npm run db:push
5. npm run dev

SUPPORT:
- Email: support@fabrk.dev
- Docs: https://fabrk.dev/docs

LICENSE INFO:
- License Key: [key]
- Plan: [Perpetual/Annual/Team/Enterprise]
- Expires: [date or "Never" for perpetual]

Next Steps:
1. Complete onboarding (2-4 hours)
2. Customize for your SaaS
3. Deploy to production
4. Launch! 🚀

Any questions? Reply to this email or jump in Discord.

Welcome aboard!
[Fabrk Team]
```

---

## 8. Post-Delivery Support

### 8.1 Onboarding Support (First 2 Weeks)

- ✅ Help with environment setup
- ✅ Database connection troubleshooting
- ✅ Stripe integration questions
- ✅ Deployment guidance
- ✅ Feature customization advice

### 8.2 Ongoing Support (Permanent)

- ✅ Bug reports and fixes
- ✅ Feature documentation
- ✅ Best practices guidance
- ✅ Update assistance
- ✅ General troubleshooting

### 8.3 What We Won't Do

- ❌ Build custom features
- ❌ Manage their hosting/infrastructure
- ❌ Provide 24/7 on-call support
- ❌ Audit their deployments
- ❌ Train their customers/users

---

## 9. Refund & Satisfaction Policy

### 9.1 Money-Back Guarantee

- **30-day refund period** from purchase date
- No questions asked
- "If Fabrk isn't what you expected, get your money back"
- Processed within 5-10 business days

### 9.2 Why This Works

- **Customer Confidence:** Removes risk from purchase decision
- **Quality Signal:** Shows we stand behind our product
- **Converts Better:** Customers more likely to buy with refund option
- **Rarely Used:** <5% refund rate industry-wide

### 9.3 Handling Refunds

1. Customer emails support@fabrk.dev requesting refund
2. Confirm within 24 hours
3. Process refund through Stripe (automatic)
4. Revoke GitHub access
5. Ask for feedback (optional)

---

## 10. Packaging for Different Channels

### 10.1 Direct Sales (Recommended)

**How:** Sell directly on fabrk.dev website
- Customer purchases → GitHub access added → Email sent
- Full control over pricing, messaging, support
- Highest margins (100% revenue)
- Best customer relationships

### 10.2 Marketplace (Future)

**Potential platforms:**
- Gumroad (digital products, handles payments)
- Stripe (custom implementation)
- GitHub Sponsors (licensing model)

**Trade-offs:**
- Platform takes 3-10% fee
- Less control over customer experience
- Easier customer discovery

### 10.3 Partnerships (Agencies, Resellers)

**For agencies wanting to resell to clients:**

- Requires **Enterprise License** (custom contract)
- 30-50% discount from retail price
- Right to white-label (remove Fabrk branding)
- Resale support provided
- Non-compete clause typically included

Contact: business@fabrk.dev

---

## 11. Versioning & Release Strategy

### 11.1 Version Format

```
v1.0.0
│ │ │
│ │ └─ Patch (bug fixes)
│ └─── Minor (new features, backwards compatible)
└───── Major (breaking changes)
```

### 11.2 Release Schedule

- **Patches (v1.0.x):** Weekly or as-needed
- **Minor versions (v1.1.0, v1.2.0):** Monthly
- **Major versions (v2.0.0):** Every 6-12 months

### 11.3 Backwards Compatibility

**Promise:** v1.x stays backwards compatible
- Database migrations provided for schema changes
- API endpoints don't change
- Components maintain same props interface
- Breaking changes require major version bump

---

## 12. Geographic & Legal Considerations

### 12.1 Where Fabrk Can Be Used

**Allowed:**
- ✅ United States
- ✅ European Union (GDPR compliant)
- ✅ Canada
- ✅ Most countries (except sanctioned countries)

**Restricted:**
- ❌ Iran, North Korea, Syria, Crimea (US sanctions)
- ❌ Illegal activities (requires legal use)

**See LICENSE.md for complete terms.**

### 12.2 Compliance Responsibility

**We Handle:**
- ✅ Code security (OWASP Top 10)
- ✅ WCAG 2.1 AA accessibility
- ✅ GDPR data handling patterns

**Customer Must Handle:**
- ✅ GDPR data processing agreement (if EU users)
- ✅ CCPA compliance (if California users)
- ✅ HIPAA (if health data) - not included, requires enterprise
- ✅ PCI DSS (we use Stripe, not needed)

---

## 13. FAQ: Distribution Questions

**Q: Can I share the code with my co-founder?**
A: Yes. License is per-organization, not per-person. Add them as team member.

**Q: Can I use it for multiple SaaS products?**
A: Yes, but each needs separate license (one product per license).

**Q: Can I sell modified versions of Fabrk?**
A: No, not without enterprise license. See LICENSE.md.

**Q: What if I don't pay the annual renewal?**
A: License expires, you can't pull updates. Can still run existing deployment.

**Q: Is there a refund if I buy perpetual, then want annual?**
A: No, different products. Choose wisely.

**Q: Can I get source code as ZIP instead of GitHub?**
A: We'll create a ZIP, but GitHub is recommended for updates/version control.

---

## Summary

**Fabrk Distribution Model:**
1. Customer purchases on website
2. Automated: GitHub access + email with onboarding guide
3. Customer clones repo + follows ONBOARDING-CHECKLIST.md
4. Customer customizes & deploys
5. Ongoing: Email support + Discord community

**Key Files for Customers:**
- LICENSE.md (legal terms)
- SECURITY.md (security policy)
- docs/ONBOARDING-CHECKLIST.md (setup guide)
- DISTRIBUTION.md (this file)
- QUICK-START.md (fast setup)

---

**Distribution Model v1.0**
**Last Updated:** November 22, 2025

For questions: business@fabrk.dev

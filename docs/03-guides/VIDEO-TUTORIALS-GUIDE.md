# Video Tutorials Creation Guide

**Timeline:** 3 hours total (1 hour per video)
**Difficulty:** Beginner-friendly (no video production experience needed)
**Target:** Post-launch (Week 2)

---

## Overview: 3 Essential Videos

| Video | Duration | Audience | Effort | Priority |
|-------|----------|----------|--------|----------|
| Setup in 5 Minutes | 5 min | Developers | 1 hour | 🔴 Critical |
| Build Dashboard | 10 min | Intermediate devs | 1 hour | 🟠 Important |
| Deploy to Vercel | 5 min | All devs | 1 hour | 🟠 Important |

---

## Video 1: "Setup Fabrk in 5 Minutes"

### Purpose
Get someone from cloning to running dev server instantly. Removes friction from first experience.

### Equipment Needed
- Mac/PC with Fabrk cloned
- Screen recording software (ScreenFlow, OBS, or QuickTime)
- Headphones + mic
- Terminal window + IDE visible

### Script (Read naturally, not robotic)

```
[0:00-0:15] INTRO
"Hey! Let's get Fabrk running in 5 minutes.
I'm going to show you the fastest way to set up a production-ready SaaS boilerplate."

[0:15-0:45] CLONE & DEPENDENCIES (30 sec)
"First, clone the repository. I've already got it here.
Now let's install dependencies with npm install."
[SHOW: npm install output running]
"This takes about a minute while we grab a coffee."

[0:45-1:30] ENVIRONMENT VARIABLES (45 sec)
"While that's running, let's set up our environment variables.
Copy .env.example to .env.local"
[SHOW: cp command]
"Now you'll see we need DATABASE_URL, NEXTAUTH_SECRET, and a few API keys.
For local development, you can use this default database URL for testing."
[SHOW: filling in .env.local with demo values]

[1:30-2:15] DATABASE SETUP (45 sec)
"Let's push the database schema. Just one command: npm run db:push"
[SHOW: db push output]
"Prisma syncs your database automatically. Pretty cool, right?"

[2:15-3:00] START DEV SERVER (45 sec)
"Dependencies installed? Great! Now start the dev server: npm run dev"
[SHOW: dev server starting]
"Open localhost:3000 and boom - you've got a full SaaS dashboard running locally."
[SHOW: Landing page loading in browser]

[3:00-4:30] DEMO THE APP (90 sec)
"Let me quickly show you what you've got:
- Authentication system with email signup
- Multi-tenant organizations
- Dashboard with member management
- Settings pages
- Billing integration ready to go
All production-ready, fully typed, tested, and documented."
[SHOW: Quick tour of UI]

[4:30-5:00] WHAT'S NEXT (30 sec)
"Next steps: Check out the documentation at /docs/01-launch
Or start building with the 87 production components in /src/components
Good luck shipping! 🚀"
```

### Recording Checklist
- [ ] Zoom to 150% (larger text)
- [ ] 1920x1080 resolution minimum
- [ ] Disable Slack/email notifications (silence phone)
- [ ] Test microphone level (not too loud/quiet)
- [ ] Clear desktop of distractions
- [ ] Have .env.example content ready to paste

### Do's and Don'ts

**DO:**
- Speak naturally and conversational
- Pause for 1-2 seconds at key moments
- Show terminal output and browser side-by-side
- Use arrow cursor to point at important UI elements

**DON'T:**
- Don't read from script robotically
- Don't show typing slowly (speed up recording)
- Don't explain every line of code
- Don't include errors (do a dry run first)

### Recording Software Recommendations

**Mac:** ScreenFlow ($99, best quality) or QuickTime (free, built-in)
**Windows:** OBS Studio (free, professional)
**Web:** Loom (free, cloud-based, easiest)

### Editing (2 minutes in any software)
1. Trim silence at beginning/end (5 seconds each)
2. Add title card (first 2 seconds, "Fabrk Setup in 5 Minutes")
3. Add end card (last 3 seconds, "Next video: Build Dashboard")
4. Fade audio in/out (0.5 second fade)
5. Render as MP4 at 1080p 30fps

---

## Video 2: "Build Your First Dashboard Feature"

### Purpose
Show developers the developer experience. Build a small feature end-to-end.

### Scope (Achievable in 10 minutes)
Build a simple feature: **Add a customer details section to the dashboard**

This demonstrates:
- File structure
- Component creation
- Database queries
- Styling with design tokens
- Running tests

### Equipment
Same as Video 1

### Script Outline (More technical)

```
[0:00-0:30] INTRO
"In this video, we're going to build a real feature from scratch.
We'll add a customer details widget to the dashboard.
You'll see how fast Fabrk makes development."

[0:30-1:15] UNDERSTAND THE STRUCTURE (45 sec)
"Here's the project structure. Notice the three layers:
- UI Layer (src/app/) - Routes and pages
- API Layer (src/app/api/) - Server endpoints
- Service Layer (src/lib/) - Database, utilities"
[SHOW: Filesystem with colors highlighting each layer]

[1:15-2:30] CREATE DATABASE MODEL (75 sec)
"First, let's define what we're storing.
Open prisma/schema.prisma and add our Customer model:
model Customer {
  id String @id @default(cuid())
  organizationId String
  name String
  email String
}"
[SHOW: Typing in schema]
"Run npm run db:push to sync the database. Done."

[2:30-3:45] BUILD THE API ENDPOINT (75 sec)
"Now the API. Create src/app/api/customers/route.ts
This will be our backend:"
[SHOW: Creating file and typing]
"We get the session, validate permission, query the database, return JSON.
Standard pattern - you'll see this everywhere."
[SHOW: API route code]

[3:45-5:00] CREATE THE REACT COMPONENT (75 sec)
"Now the UI. Create a new component that calls our API:
src/components/dashboard/customer-details.tsx"
[SHOW: Creating component]
"We use our design tokens for styling - bg-primary, text-muted-foreground.
Never hardcode colors. This ensures theme switching works."
[SHOW: Component code with design tokens]

[5:00-6:15] ADD IT TO THE DASHBOARD (75 sec)
"Drop it into the dashboard page. Takes 2 lines:
import { CustomerDetails } from '@/components/dashboard/customer-details'

<CustomerDetails />"
[SHOW: Page update]

[6:15-7:30] TEST IT (75 sec)
"Let's test the component in component documentation:
#Component showcase at /components
[SHOW: component documentation running]
"This is where you develop components in isolation.
Write a quick test too:"
[SHOW: Test file creation]
"npm test and it passes. Nice."

[7:30-9:00] DEMO IN BROWSER (90 sec)
"Here's the live app with our new feature.
Click around, see the component render with real data.
Notice how fast development is?
No compile step, hot reload working, tests passing.
This is the Fabrk experience."
[SHOW: Browser demo with feature working]

[9:00-10:00] RECAP (60 sec)
"What did we do?
1. Defined data model in Prisma (type-safe)
2. Created API endpoint (5 minutes)
3. Built React component (5 minutes)
4. Tested in component documentation (2 minutes)
5. Added to page (1 minute)
Total: ~15 minutes for a real feature.

This is why Fabrk is great - everything is wired up for speed.
Check the documentation for deeper dives into authentication, payments, etc."
```

### Recording Tips
- Have code ready in editor (don't live-code)
- Use VS Code shortcuts (Cmd+P for file search)
- Show terminal and browser simultaneously
- Pause at each step (2 seconds) for viewers to process

### Editing
- Add code syntax highlighting overlay
- Add keyboard press indicators (when using shortcuts)
- Add arrow annotations pointing to important UI elements
- Title cards between sections ("Create API", "Build Component", etc.)

---

## Video 3: "Deploy to Vercel in 3 Minutes"

### Purpose
Remove deployment anxiety. Show it's simple.

### Script Overview

```
[0:00-0:20] INTRO
"Deploying Fabrk is dead simple.
Push to GitHub, Vercel auto-deploys.
Let me show you."

[0:20-0:50] GITHUB SETUP (30 sec)
"Push your code to GitHub. I've already done this."
[SHOW: GitHub repo page]

[0:50-1:30] CONNECT VERCEL (40 sec)
"Go to vercel.com, sign in, import project from GitHub.
Select your Fabrk repo."
[SHOW: Vercel import flow]

[1:30-2:30] CONFIGURE ENV VARIABLES (60 sec)
"Paste your environment variables into Vercel.
These are the same ones from .env.local:
DATABASE_URL, NEXTAUTH_SECRET, STRIPE keys, etc."
[SHOW: Adding env vars in Vercel UI]

[2:30-3:00] DEPLOY (30 sec)
"Click Deploy. It builds and pushes live in 30 seconds."
[SHOW: Build progress]
"Done. Your SaaS is live on the internet."

[3:00-3:30] VERIFY (30 sec)
"Visit your.vercel.app domain. Everything works.
Database, auth, payments - all live."
[SHOW: Live app working in browser]
"That's it. You're shipped. Congrats!"
```

### Key Points to Show
- GitHub integration automatic
- Env variables interface
- Build log success
- Custom domain setup (1 minute bonus)
- Analytics dashboard

### Editing
- Quick cuts between steps (1-2 seconds)
- Upbeat background music (royalty-free, optional)
- Text overlays for important settings

---

## Distribution Strategy

### Where to Upload

1. **YouTube Channel** (5-10 minute SEO boost)
   - Title: "How to Setup Fabrk SaaS Boilerplate in 5 Minutes"
   - Tags: fabrk, saas, boilerplate, next.js, stripe
   - Description: Include docs link
   - Thumbnail: Show code + "5 MINUTES" in big text

2. **Landing Page** (Product page conversion)
   - Embed as hero video above fold
   - "See Fabrk in action" section
   - Video autoplay (muted)

3. **Documentation** (docs/02-guides/VIDEO-TUTORIALS.md)
   - Embed all 3 videos
   - Linked from main README

4. **Twitter/X** (Social proof)
   - Post links to all 3
   - Share clips (30-sec highlight)
   - "Learning curve: 5 minutes" angle

### Video SEO

**YouTube Titles (for search):**
- "How to Setup Fabrk SaaS Boilerplate in 5 Minutes"
- "Build a Feature with Fabrk - Full Stack Tutorial"
- "Deploy Next.js to Vercel - Complete Guide"

**Keywords:** fabrk, saas boilerplate, next.js, stripe, vercel, typescript, full-stack

**Descriptions Include:**
- What's covered in video
- Links to documentation
- GitHub link
- Timestamps (for longer videos)

---

## Timeline (3 Hours Total)

### Day 1 (1.5 hours)
- Record Video 1: Setup (45 min)
- Edit Video 1 (15 min)
- Record Video 2: Dashboard (30 min) - takes longer, more complex

### Day 2 (1.5 hours)
- Edit Video 2 (30 min)
- Record Video 3: Deploy (30 min)
- Edit Video 3 (15 min)
- Upload all 3 (15 min)

**Total: 3 hours**

---

## Quality Checklist

- [ ] Audio is clear (no background noise)
- [ ] Text is readable (zoom to 150%)
- [ ] Resolution is 1920x1080 or higher
- [ ] No long pauses (>3 seconds) except intentional breaks
- [ ] Transitions between sections are smooth
- [ ] Title card at start (3 seconds)
- [ ] End card with "Next video" link (3 seconds)
- [ ] YouTube metadata filled out completely
- [ ] Description has links to docs/GitHub
- [ ] Thumbnail has good contrast and readable text

---

## Optional Enhancements (Do Later)

- Add animated captions (helps accessibility)
- Create playlist on YouTube
- Add interactive elements (YouTube cards linking between videos)
- Transcribe videos (auto-captions from YouTube + manual review)
- Create blog posts accompanying each video
- Bonus short videos (30-60 seconds) for TikTok/Shorts

---

## Example End Card Script

"Thanks for watching! Check out the Fabrk documentation at docs.fabrk.dev for deeper dives.
Next video: [Link to next video]

---

**Next Step:** Record Video 1 this week. Videos 2-3 can follow in Week 2 post-launch.

Last Updated: November 20, 2025

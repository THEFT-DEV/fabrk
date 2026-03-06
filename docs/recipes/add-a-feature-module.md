# Add a Feature Module

How to add a complete feature (page + components + API + service) to your FABRK app.

We will use a "Projects" feature as the running example.

---

## 1. Create the Page

Create `src/app/(platform)/projects/page.tsx`:

```tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ProjectList } from '@/components/projects/project-list';
import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata({
  title: 'Projects',
  description: 'Manage your projects',
  noIndex: true,
});

export default async function ProjectsPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold uppercase">PROJECTS</h1>
      <ProjectList userId={session.user.id} />
    </div>
  );
}
```

## 2. Create Components

Create `src/components/projects/project-list.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'archived';
  createdAt: string;
}

export function ProjectList({ userId }: { userId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => { setProjects(data.data || []); setLoading(false); });
  }, []);

  if (loading) return <Skeleton className="h-40 w-full" />;

  return (
    <Card>
      <CardHeader title="projects.db" code="0xA1" />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>
                  <Badge code={p.status === 'active' ? '0x01' : '0x00'} label={p.status.toUpperCase()} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
```

## 3. Create the API Route

Create `src/app/api/projects/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = await getProjects(session.user.id);
    return NextResponse.json({ data: projects }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

Add `POST`, `PUT`, `DELETE` handlers following the same `auth()` guard pattern.

## 4. Create the Service Layer

Create `src/lib/projects/index.ts`:

```ts
import { prisma } from '@/lib/prisma';

export async function getProjects(userId: string) {
  return prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createProject(data: { name: string; userId: string }) {
  return prisma.project.create({
    data: { name: data.name, userId: data.userId, status: 'active' },
  });
}
```

## 5. Add the Prisma Model

Add to `prisma/schema.prisma`:

```prisma
model Project {
  id        String   @id @default(cuid())
  name      String
  status    String   @default("active")
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}
```

Then push the schema:

```bash
npm run db:push
```

## 6. Add to Navigation

Edit `src/components/dashboard/dashboard-header.tsx` and add to the `navigationItems` array:

```ts
import { FolderKanban } from 'lucide-react';

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/developer/api-keys', label: 'API Keys', icon: Code },
];
```

## Checklist

- [ ] Page created in `src/app/(platform)/`
- [ ] Components use existing UI primitives (`Card`, `Table`, `Badge`, `Button`)
- [ ] API route uses `auth()` guard
- [ ] Service layer in `src/lib/`
- [ ] Prisma model added and pushed
- [ ] Navigation updated in dashboard header
- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds

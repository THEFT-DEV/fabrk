import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getCategories, createCategory, deleteCategory } from '@/lib/blog';
import { generateSlug, isValidSlug } from '@/lib/blog';
import { withCsrfProtection } from '@/lib/security/csrf';
import { logger } from '@/lib/logger';

/**
 * GET /api/blog/categories
 * Get all blog categories
 */
export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    logger.error('Error fetching blog categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

/**
 * POST /api/blog/categories
 * Create a new category (admin only)
 */
export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    let slug = body.slug || generateSlug(name);
    if (!isValidSlug(slug)) {
      slug = generateSlug(name);
    }

    const category = await createCategory({ name, slug, description });

    logger.info('Blog category created', { categoryId: category.id, name });

    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A category with this name or slug already exists' },
        { status: 400 }
      );
    }

    logger.error('Error creating blog category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
});

/**
 * DELETE /api/blog/categories
 * Delete a category (admin only)
 */
export const DELETE = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    await deleteCategory(id);

    logger.info('Blog category deleted', { categoryId: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error deleting blog category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
});

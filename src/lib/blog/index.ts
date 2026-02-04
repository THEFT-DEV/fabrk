/**
 * Blog Module
 * Git-based blog using Outstatic CMS
 */

export {
  getPublishedPosts,
  getPostBySlug,
  getPostById,
  getAllPosts,
  getAllPostsForFeed,
  createPost,
  updatePost,
  deletePost,
  incrementViewCount,
  getCategories,
  createCategory,
  deleteCategory,
  type BlogPostWithAuthor,
} from './outstatic';

export { generateSlug, formatDate, formatReadTime, generateExcerpt, isValidSlug } from './utils';

export { mdxComponents } from './mdx-components';

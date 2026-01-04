/**
 * Generic Testimonials Example
 *
 * Replace with real testimonials from your customers.
 * These are format examples showing the expected structure.
 */

export const TESTIMONIALS_EXAMPLE = [
  {
    id: 'testimonial-1',
    name: 'Alex Johnson',
    role: 'Founder',
    company: 'StartupName',
    avatar: '/avatars/placeholder-1.jpg',
    content:
      'This boilerplate saved us months of development time. We launched our MVP in 2 weeks instead of 3 months. The code quality is excellent.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechCorp',
    avatar: '/avatars/placeholder-2.jpg',
    content:
      'The authentication and payment integrations work flawlessly. We focused on building features instead of infrastructure. Highly recommended.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Michael Brown',
    role: 'Solo Developer',
    company: 'IndieHacker',
    avatar: '/avatars/placeholder-3.jpg',
    content:
      'As a solo developer, this gave me the foundation I needed. The documentation is clear and the code is well-organized. Worth every penny.',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    name: 'Emily Davis',
    role: 'Product Manager',
    company: 'GrowthCo',
    avatar: '/avatars/placeholder-4.jpg',
    content:
      'We evaluated several boilerplates and this was the most complete. Multi-tenancy, billing, and admin dashboard were exactly what we needed.',
    rating: 5,
  },
  {
    id: 'testimonial-5',
    name: 'David Wilson',
    role: 'Lead Engineer',
    company: 'ScaleUp',
    avatar: '/avatars/placeholder-5.jpg',
    content:
      'Clean architecture and modern tech stack. Easy to customize and extend. Our team was productive from day one.',
    rating: 5,
  },
  {
    id: 'testimonial-6',
    name: 'Lisa Martinez',
    role: 'Founder',
    company: 'SaaSApp',
    avatar: '/avatars/placeholder-6.jpg',
    content:
      'The best investment for our product. Shipped faster, with better quality than we could have built ourselves. Support is fantastic.',
    rating: 5,
  },
] as const;

// Testimonial with more details
export const FEATURED_TESTIMONIALS_EXAMPLE = [
  {
    id: 'featured-1',
    name: 'John Smith',
    role: 'Technical Founder',
    company: 'B2B SaaS',
    avatar: '/avatars/placeholder-featured-1.jpg',
    image: '/testimonials/case-study-1.jpg',
    content:
      'We needed to validate our idea quickly. This boilerplate let us focus on our unique features while having production-grade infrastructure. We got our first paying customer in week 3.',
    metrics: {
      timeSaved: '12 weeks',
      revenue: '$50k MRR',
      users: '500+ active users',
    },
    rating: 5,
  },
] as const;

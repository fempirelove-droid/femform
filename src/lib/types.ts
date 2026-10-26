export type MembershipTier = 'free' | 'community' | 'premium';

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  sort_order: number;
  glow_color: string;
  orb_gradient: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  category_id: string;
  excerpt: string;
  body: string;
  faq: FAQItem[];
  cover_image: string;
  is_free: boolean;
  reading_time_min: number;
  author_name: string;
  author_bio: string;
  medical_reviewed: boolean;
  medical_reviewer_name: string;
  status: string;
  published_at: string;
  updated_at: string;
  category?: Category;
};

import { supabase } from './supabase';
import type { Article, Category } from './types';

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order');
  if (error) {
    console.error('fetchCategories error:', error);
    return [];
  }
  return (data as Category[]) || [];
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) {
    console.error('fetchCategoryBySlug error:', error);
    return null;
  }
  return (data as Category) || null;
}

export async function fetchArticlesByCategory(categoryId: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) {
    console.error('fetchArticlesByCategory error:', error);
    return [];
  }
  return (data as Article[]) || [];
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) {
    console.error('fetchArticleBySlug error:', error);
    return null;
  }
  return (data as Article) || null;
}

export async function fetchAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) {
    console.error('fetchAllArticles error:', error);
    return [];
  }
  return (data as Article[]) || [];
}

export async function fetchRelatedArticles(categoryId: string, excludeId: string, limit = 3): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .neq('id', excludeId)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('fetchRelatedArticles error:', error);
    return [];
  }
  return (data as Article[]) || [];
}

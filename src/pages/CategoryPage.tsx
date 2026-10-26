import { useEffect, useState } from 'react';
import { Clock, Lock } from 'lucide-react';
import type { NavigateFn } from '@/types';
import { fetchCategoryBySlug, fetchArticlesByCategory } from '@/lib/data';
import type { Category, Article } from '@/lib/types';
import { useSEO } from '@/hooks/useSEO';

type Props = { navigate: NavigateFn; categorySlug: string };

export function CategoryPage({ navigate, categorySlug }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: category ? `${category.name} — Fempire.Love` : 'Loading… — Fempire.Love',
    description: category?.description,
    canonical: `/${categorySlug}`,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCategoryBySlug(categorySlug).then((cat) => {
      if (cancelled) return;
      if (!cat) {
        setLoading(false);
        return;
      }
      setCategory(cat);
      fetchArticlesByCategory(cat.id).then((arts) => {
        if (!cancelled) {
          setArticles(arts);
          setLoading(false);
        }
      });
    });
    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-soft text-sm">Loading…</p>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-[22px]">
        <h1 className="font-display font-bold text-2xl text-cream">Category not found</h1>
        <button className="btn-glass small" onClick={() => navigate('/')}>
          Back to home
        </button>
      </main>
    );
  }

  return (
    <main>
      <div className="pt-[50px] pb-8">
        <div className="max-w-site mx-auto px-[22px]">
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-14 h-14 rounded-full flex-shrink-0"
              style={{
                background: category.orb_gradient,
                boxShadow: `0 0 24px 2px ${category.glow_color}`,
              }}
            />
            <div>
              <h1 className="font-display font-bold text-[clamp(30px,5vw,44px)] leading-[1.05] tracking-tight">
                {category.name}
              </h1>
            </div>
          </div>
          <p className="text-soft text-[16px] max-w-[560px] leading-[1.7] mb-10">
            {category.description}
          </p>
        </div>
      </div>

      <div className="max-w-site mx-auto px-[22px] pb-20">
        {articles.length === 0 ? (
          <div className="glass p-10 text-center">
            <p className="text-soft text-[15px]">
              No articles in this category yet. New content is coming soon — stay tuned.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {articles.map((article) => (
              <a
                key={article.id}
                href={`/${category.slug}/${article.slug}`}
                className="glass p-6 no-underline text-cream hover:-translate-y-1 transition-transform cursor-pointer block"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${category.slug}/${article.slug}`);
                }}
              >
                <h3 className="font-display font-bold text-[18px] mb-2 leading-[1.3]">
                  {article.title}
                </h3>
                <p className="text-[13px] text-soft leading-[1.6] mb-3">{article.excerpt}</p>
                <div className="flex gap-3 text-[12px] text-soft-2 items-center">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {article.reading_time_min} min
                  </span>
                  {!article.is_free && (
                    <span className="inline-flex items-center gap-1 text-mustard-hi">
                      <Lock size={12} /> Members
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

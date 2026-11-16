import { useEffect, useState } from 'react';
import { Clock, Lock } from 'lucide-react';
import type { NavigateFn } from '@/types';
import { fetchCategoryBySlug, fetchArticlesByCategory } from '@/lib/data';
import { TOPIC_CATALOG } from '@/lib/catalog';
import type { Category, Article } from '@/lib/types';
import { useSEO } from '@/hooks/useSEO';
import { ArticleCover, TopicMotif } from '@/components/visuals';
import { coverForTopic, MEDIA } from '@/lib/media';

type Props = { navigate: NavigateFn; categorySlug: string };

export function CategoryPage({ navigate, categorySlug }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: category ? `${category.name} · Fempire.Love` : 'Loading… · Fempire.Love',
    description: category?.description,
    canonical: `/${categorySlug}`,
    image: `https://fempire.love${coverForTopic(categorySlug)}`,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCategoryBySlug(categorySlug).then((cat) => {
      if (cancelled) return;
      const resolved = cat || TOPIC_CATALOG.find((c) => c.slug === categorySlug) || null;
      if (!resolved) {
        setLoading(false);
        return;
      }
      setCategory(resolved);
      if (cat) {
        fetchArticlesByCategory(cat.id).then((arts) => {
          if (!cancelled) {
            setArticles(arts);
            setLoading(false);
          }
        });
      } else {
        setArticles([]);
        setLoading(false);
      }
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

  const scene = coverForTopic(category.slug);
  const isQueenerty = category.slug === 'hormones-cycle';

  return (
    <main>
      <section className="relative overflow-hidden pt-[50px] pb-10">
        <div className="max-w-site mx-auto px-[22px]">
          <div
            className="relative overflow-hidden rounded-[22px] mb-8"
            style={{ border: '1px solid var(--glass-b)' }}
          >
            <div className="relative h-[180px] sm:h-[240px]">
              <img
                src={scene}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover object-center scene-ken"
                loading="eager"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(36,16,25,0.15) 0%, rgba(96,23,51,0.55) 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 flex items-end gap-4">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: category.orb_gradient,
                    boxShadow: `0 0 24px 2px ${category.glow_color}`,
                  }}
                >
                  <TopicMotif slug={category.slug} size={46} />
                </div>
                <div>
                  {isQueenerty && (
                    <span className="inline-block text-[11px] font-bold uppercase tracking-[0.08em] text-mustard-hi mb-1.5">
                      Queenerty
                    </span>
                  )}
                  <h1 className="font-display font-bold text-[clamp(28px,5vw,42px)] leading-[1.05] tracking-tight m-0">
                    {category.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <p className="text-soft text-[16px] max-w-[560px] leading-[1.7] m-0">
            {category.description}
          </p>
        </div>
      </section>

      <div className="max-w-site mx-auto px-[22px] pb-20">
        {articles.length === 0 ? (
          <div className="glass p-10 text-center">
            <p className="text-soft text-[15px]">
              No articles in this category yet. New content is coming soon. Stay tuned.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {articles.map((article) => (
              <a
                key={article.id}
                href={`/${category.slug}/${article.slug}`}
                className="glass p-0 no-underline text-cream hover:-translate-y-1 transition-transform cursor-pointer block overflow-hidden"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${category.slug}/${article.slug}`);
                }}
              >
                <ArticleCover
                  slug={category.slug}
                  coverImage={article.cover_image}
                  title={article.title}
                  compact
                  className="rounded-none border-0"
                />
                <div className="p-6">
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
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

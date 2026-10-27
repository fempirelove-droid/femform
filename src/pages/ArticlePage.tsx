import { useEffect, useState } from 'react';
import { Lock, Clock, Calendar, ShieldCheck } from 'lucide-react';
import type { NavigateFn } from '@/types';
import { fetchArticleBySlug, fetchRelatedArticles } from '@/lib/data';
import type { Article } from '@/lib/types';
import { useSEO } from '@/hooks/useSEO';
import { useAuth } from '@/hooks/useAuth';
import { Button, GlassPanel } from '@/components/ui';
import { ArticleCover } from '@/components/visuals';
import { coverForTopic } from '@/lib/media';

type Props = { navigate: NavigateFn; slug: string };

export function ArticlePage({ navigate, slug }: Props) {
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { tier } = useAuth();
  const isMember = tier === 'community' || tier === 'premium';

  useSEO({
    title: article ? `${article.title} ? Fempire.Love` : 'Loading? ? Fempire.Love',
    description: article?.excerpt,
    type: 'article',
    image: article
      ? article.cover_image?.trim() || `https://fempire.love${coverForTopic(article.category?.slug)}`
      : undefined,
    canonical: article ? `/${article.category?.slug}/${article.slug}` : undefined,
    jsonLd: article
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            author: { '@type': 'Person', name: article.author_name },
            publisher: {
              '@type': 'Organization',
              name: 'Fempire.Love',
            },
            datePublished: article.published_at,
            dateModified: article.updated_at,
          },
          article.faq.length > 0
            ? {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: article.faq.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
              }
            : null,
        ].filter(Boolean)
      : undefined,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetchArticleBySlug(slug).then((a) => {
      if (cancelled) return;
      if (!a) {
        setError(true);
        setLoading(false);
        return;
      }
      setArticle(a);
      fetchRelatedArticles(a.category_id, a.id).then((r) => {
        if (!cancelled) setRelated(r);
      });
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-soft text-sm">Loading?</p>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-[22px]">
        <h1 className="font-display font-bold text-2xl text-cream">Article not found</h1>
        <p className="text-soft text-sm">This article may have moved or is no longer available.</p>
        <button className="btn-glass small" onClick={() => navigate('/')}>
          Back to home
        </button>
      </main>
    );
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const locked = !article.is_free && !isMember;

  return (
    <main>
      {/* Breadcrumb */}
      <div className="max-w-site mx-auto px-[22px] pt-[34px] text-[13px] text-soft-2">
        <a
          href="/"
          className="text-soft no-underline hover:text-cream cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          Home
        </a>
        {' ? '}
        <a
          href={`/${article.category?.slug}`}
          className="text-soft no-underline hover:text-cream cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${article.category?.slug}`);
          }}
        >
          {article.category?.name}
        </a>
      </div>

      {/* Article hero */}
      <div className="max-w-[760px] mx-auto px-[22px] pt-[26px] pb-10">
        <ArticleCover
          slug={article.category?.slug}
          coverImage={article.cover_image}
          title={article.title}
          className="mb-7"
        />
        <span
          className="inline-block px-4 py-[7px] rounded-full text-xs font-bold mb-[18px]"
          style={{
            background: 'rgba(255,92,138,0.16)',
            color: 'var(--bougain)',
            border: '1px solid rgba(255,92,138,0.3)',
          }}
        >
          {article.category?.name}
        </span>
        <h1 className="font-display font-bold text-[clamp(30px,5.4vw,50px)] leading-[1.08] mb-4 tracking-tight">
          {article.title}
        </h1>
        <p className="text-soft text-[17px] leading-[1.7] mb-5">{article.excerpt}</p>
        <div className="flex gap-4 text-[13px] text-soft-2 flex-wrap items-center">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} /> {article.reading_time_min} min read
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} /> {formatDate(article.published_at)}
          </span>
          {article.is_free ? (
            <span>Free article</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-mustard-hi">
              <Lock size={13} /> Members only
            </span>
          )}
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-[680px] mx-auto px-[22px] pb-15">
        {locked ? (
          <>
            <div
              className="text-soft text-[16.5px] leading-[1.85] article-body relative overflow-hidden max-h-[220px]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
              }}
              dangerouslySetInnerHTML={{
                __html: article.body.slice(0, 480) + (article.body.length > 480 ? '?' : ''),
              }}
            />
            <GlassPanel className="p-8 text-center mt-6">
              <Lock className="mx-auto mb-3 text-mustard-hi" size={22} />
              <h3 className="font-display font-bold text-[22px] mb-2.5">This article is for members</h3>
              <p className="text-soft text-[14.5px] mb-[22px] max-w-[440px] mx-auto">
                Join Community or Premium to read the full piece and every member article on
                Fempire.Love.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={() => navigate('/community#join')}>Join the Circle</Button>
                <Button variant="glass" onClick={() => navigate('/account?next=/' + encodeURIComponent(`${article.category?.slug}/${article.slug}`))}>
                  Sign in
                </Button>
              </div>
            </GlassPanel>
          </>
        ) : (
          <>
            <div
              className="text-soft text-[16.5px] leading-[1.85] article-body"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />

            {article.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display font-bold text-[26px] text-cream mb-5">
                  Frequently asked questions
                </h2>
                {article.faq.map((item, i) => (
                  <details key={i} className="glass mb-3 p-5">
                    <summary className="font-display font-semibold text-base cursor-pointer list-none">
                      {item.question}
                    </summary>
                    <p
                      className="text-soft text-[14.5px] leading-[1.7] mt-3.5 m-0"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </details>
                ))}
              </div>
            )}

            {article.medical_reviewed && article.medical_reviewer_name && (
              <div
                className="flex items-center gap-3 mt-8 p-4 rounded-xl"
                style={{
                  background: 'rgba(198,138,46,0.12)',
                  border: '1px solid rgba(198,138,46,0.3)',
                }}
              >
                <ShieldCheck size={20} className="text-mustard-hi flex-shrink-0" />
                <p className="text-[13px] text-soft m-0">
                  Medically reviewed by {article.medical_reviewer_name}. This article was last updated{' '}
                  {formatDate(article.updated_at)}.
                </p>
              </div>
            )}

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--glass-b)' }}>
              <p className="text-[13px] text-soft-2">
                <span className="text-cream font-semibold">{article.author_name}</span>
                {article.author_bio ? ` ? ${article.author_bio}` : ''}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-site mx-auto px-[22px] py-10 pb-20">
          <h3 className="font-display font-bold text-xl mb-[22px]">
            More in {article.category?.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {related.map((item) => (
              <a
                key={item.id}
                href={`/${item.category?.slug}/${item.slug}`}
                className="glass p-0 no-underline text-cream hover:-translate-y-1 transition-transform cursor-pointer block overflow-hidden"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${item.category?.slug}/${item.slug}`);
                }}
              >
                <ArticleCover
                  slug={item.category?.slug}
                  coverImage={item.cover_image}
                  title={item.title}
                  compact
                  className="rounded-none border-0"
                />
                <div className="p-[18px]">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.06em]"
                    style={{ color: 'var(--bougain)' }}
                  >
                    {item.category?.name}
                  </span>
                  <h4 className="font-display font-bold text-base mt-2.5 mb-1.5">{item.title}</h4>
                  <p className="text-[13px] text-soft-2 m-0">{item.reading_time_min} min read</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}


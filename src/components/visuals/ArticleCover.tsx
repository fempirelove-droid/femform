import { TopicMotif } from './TopicMotif';
import { coverForTopic } from '@/lib/media';

type Props = {
  slug?: string | null;
  coverImage?: string | null;
  title: string;
  className?: string;
  compact?: boolean;
};

/** Contextual cover: real cover when present, else topic scene + animated motif. */
export function ArticleCover({
  slug,
  coverImage,
  title,
  className = '',
  compact = false,
}: Props) {
  const src = coverImage && coverImage.trim() ? coverImage : coverForTopic(slug);

  return (
    <div
      className={`relative overflow-hidden rounded-[18px] ${compact ? 'aspect-[16/9]' : 'aspect-[5/3]'} ${className}`.trim()}
      style={{ border: '1px solid var(--glass-b)' }}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover scene-ken"
        loading="lazy"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(36,16,25,0.15) 0%, rgba(96,23,51,0.55) 55%, rgba(36,16,25,0.78) 100%)',
        }}
      />
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
        <TopicMotif slug={slug || 'default'} size={compact ? 36 : 48} />
        <span className="sr-only">{title}</span>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';
import { EyebrowChip } from './EyebrowChip';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: Props) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <div className={`mb-11 ${alignClass} ${className}`.trim()}>
      {eyebrow && <EyebrowChip className="mb-5">{eyebrow}</EyebrowChip>}
      <h2
        className={`font-display font-bold text-[clamp(28px,4.4vw,42px)] tracking-tight ${
          align === 'center' ? 'max-w-[640px] mx-auto' : 'max-w-[600px]'
        } ${description ? 'mb-3.5' : ''}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-soft text-[15.5px] leading-[1.7] ${
            align === 'center' ? 'max-w-[520px] mx-auto' : 'max-w-[500px]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

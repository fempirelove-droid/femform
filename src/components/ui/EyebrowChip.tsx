import type { HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  className?: string;
  showDot?: boolean;
};

export function EyebrowChip({
  children,
  className = '',
  showDot = true,
  ...rest
}: Props) {
  return (
    <span className={`eyebrow-chip ${className}`.trim()} {...rest}>
      {showDot && <span className="dot" />}
      {children}
    </span>
  );
}

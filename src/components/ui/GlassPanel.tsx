import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'article' | 'section';
};

export function GlassPanel({
  children,
  className = '',
  style,
  as: Tag = 'div',
  ...rest
}: Props) {
  return (
    <Tag className={`glass ${className}`.trim()} style={style} {...rest}>
      {children}
    </Tag>
  );
}

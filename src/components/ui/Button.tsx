import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'glass';
type Size = 'default' | 'small';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'default',
  children,
  fullWidth,
  className = '',
  ...rest
}: Props) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-glass';
  const sizeClass = size === 'small' ? 'small' : '';
  const width = fullWidth ? 'w-full text-center' : '';
  return (
    <button className={`${base} ${sizeClass} ${width} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}

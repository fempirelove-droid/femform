type Props = {
  className?: string;
  size?: number;
};

/** Brand mark: full profile silhouette, not cropped into a tiny circle. */
export function LogoMark({ className = '', size = 40 }: Props) {
  return (
    <img
      src="/brand/logo-mark.png"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 rounded-md ${className}`.trim()}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
      }}
      decoding="async"
    />
  );
}

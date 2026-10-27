type Props = {
  className?: string;
  size?: number;
};

/** Temporary brand mark: profile silhouette. Black plate drops out via screen blend. */
export function LogoMark({ className = '', size = 34 }: Props) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-full shrink-0 ${className}`.trim()}
      style={{
        width: size,
        height: size,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.18)',
      }}
      aria-hidden
    >
      <img
        src="/brand/logo-mark.png"
        alt=""
        width={size}
        height={size}
        className="w-full h-full object-cover"
        style={{ mixBlendMode: 'screen' }}
        decoding="async"
      />
    </span>
  );
}

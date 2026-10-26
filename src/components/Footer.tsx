import { NewsletterForm } from '@/components/NewsletterForm';

type Props = {
  onNavigate: (route: string) => void;
};

export function Footer({ onNavigate }: Props) {
  const go = (route: string) => onNavigate(route);

  return (
    <footer className="pt-16 pb-10">
      <div className="max-w-site mx-auto px-[22px]">
        <div
          id="newsletter"
          className="glass grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-8 px-8 py-10 scroll-mt-28"
        >
          <div>
            <h4 className="font-display text-base mb-4">Join the newsletter</h4>
            <NewsletterForm source="footer" onNavigatePrivacy={() => go('/privacy')} />
          </div>

          <div>
            <h4 className="font-display text-base mb-4">Explore</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Topics', route: '/explore' },
                { label: 'Webinars', route: '/webinars' },
                { label: 'Membership', route: '/membership' },
                { label: 'Journey', route: '/journey' },
                { label: 'Our Vision', route: '/vision' },
                { label: 'Coach', route: '/coach' },
                { label: 'Contact', route: '/contact' },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.route}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.route);
                  }}
                  className="text-[13.5px] text-soft hover:text-cream transition-colors no-underline"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base mb-4">Legal</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Privacy Policy', route: '/privacy' },
                { label: 'Terms & Conditions', route: '/terms' },
                { label: 'Medical Disclaimer', route: '/disclaimer' },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.route}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.route);
                  }}
                  className="text-[13.5px] text-soft hover:text-cream transition-colors no-underline"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base mb-4">Follow</h4>
            <div className="flex flex-col gap-2.5">
              {['Instagram', 'TikTok', 'Facebook'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-[13.5px] text-soft hover:text-cream transition-colors no-underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-wrap gap-2.5 text-xs text-soft-2 mt-7">
          <span>© 2026 Fempire.Love</span>
          <span
            className="inline-flex items-center gap-1.5 text-[11.5px] px-3 py-1.5 rounded-full"
            style={{
              background: 'var(--glass-2)',
              border: '1px solid var(--glass-b)',
              color: 'var(--blush)',
            }}
          >
            Add Fempire.Love to your home screen for easy access
          </span>
        </div>
      </div>
    </footer>
  );
}

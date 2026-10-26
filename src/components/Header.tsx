import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { settleIn } from '@/lib/motion';

type Props = {
  onNavigate: (route: string) => void;
  current: string;
};

export function Header({ onNavigate, current }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    settleIn('.site-header-glass', { duration: 550, delay: 80 });
  }, []);

  const go = (route: string) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  const navItems = [
    { label: 'Explore', route: '/explore' },
    { label: 'Webinars', route: '/webinars' },
    { label: 'Membership', route: '/membership' },
    { label: 'Journey', route: '/journey' },
    { label: 'Coach', route: '/coach' },
  ];

  return (
    <>
      <header className="sticky top-3.5 z-[100] px-4">
        <div className="site-header-glass glass flex max-w-site mx-auto items-center justify-between rounded-full px-5 py-3 pr-3 opacity-0">
          <a
            href="/"
            className="font-display font-extrabold text-[21px] text-cream no-underline"
            onClick={(e) => {
              e.preventDefault();
              go('/');
            }}
          >
            Fempire<span className="grad-text">.Love</span>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.route);
                }}
                className={`text-sm font-semibold transition-colors no-underline ${
                  current === item.route ? 'text-cream' : 'text-soft hover:text-cream'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button className="btn-glass small" onClick={() => go('/account')}>
              Account
            </button>
            <button className="btn-primary small" onClick={() => go('/membership')}>
              Start free
            </button>
          </nav>

          <button
            className="lg:hidden flex items-center justify-center w-[42px] h-[42px] rounded-full"
            style={{
              background: 'var(--glass-2)',
              border: '1px solid var(--glass-b)',
            }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} color="var(--cream)" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[200] flex flex-col"
          style={{
            background: 'rgba(96, 23, 51, 0.96)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-4">
            <span className="font-display font-extrabold text-[21px]">
              Fempire<span className="grad-text">.Love</span>
            </span>
            <button
              className="flex items-center justify-center w-[42px] h-[42px] rounded-full"
              style={{
                background: 'var(--glass-2)',
                border: '1px solid var(--glass-b)',
              }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} color="var(--cream)" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 pt-4">
            {[...navItems, { label: 'Our Vision', route: '/vision' }, { label: 'Contact', route: '/contact' }, { label: 'Account', route: '/account' }].map(
              (item) => (
                <a
                  key={item.label}
                  href={item.route}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.route);
                  }}
                  className="font-display font-bold text-2xl py-3 text-cream no-underline"
                >
                  {item.label}
                </a>
              ),
            )}
            <button className="btn-primary mt-6 w-full" onClick={() => go('/membership')}>
              Start free
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

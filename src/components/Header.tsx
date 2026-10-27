import { useEffect, useState } from 'react';
import {
  Compass,
  HeartHandshake,
  Menu,
  Sparkles,
  Ticket,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { LogoMark } from '@/components/LogoMark';
import { settleIn } from '@/lib/motion';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  onNavigate: (route: string) => void;
  current: string;
};

const navItems = [
  { label: 'Explore', route: '/explore', Icon: Compass },
  { label: 'Community', route: '/community', Icon: Users },
  { label: 'Webinars', route: '/webinars', Icon: Ticket },
  { label: 'Membership', route: '/membership', Icon: HeartHandshake },
  { label: 'Coach', route: '/coach', Icon: Sparkles },
] as const;

export function Header({ onNavigate, current }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, tier } = useAuth();
  const showStartFree = !user || tier === 'free';

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

  return (
    <>
      <header className="sticky top-3.5 z-[100] px-4">
        <div className="site-header-glass glass flex max-w-site mx-auto items-center justify-between gap-3 rounded-full pl-5 pr-2.5 py-2.5 opacity-0">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 font-display font-extrabold text-[20px] sm:text-[21px] text-cream no-underline shrink-0"
            onClick={(e) => {
              e.preventDefault();
              go('/');
            }}
            aria-label="Fempire.Love home"
          >
            <LogoMark size={42} />
            <span>
              Fempire<span className="grad-text">.Love</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navItems.map(({ label, route, Icon }) => {
              const active = current === route;
              return (
                <a
                  key={route}
                  href={route}
                  onClick={(e) => {
                    e.preventDefault();
                    go(route);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold no-underline transition-colors ${
                    active ? 'text-cream bg-white/10' : 'text-soft hover:text-cream hover:bg-white/5'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={15} strokeWidth={2.2} aria-hidden />
                  <span>{label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                current === '/account' ? 'bg-white/15 text-cream' : 'text-soft hover:text-cream hover:bg-white/8'
              }`}
              style={{ border: '1px solid var(--glass-b)' }}
              onClick={() => go('/account')}
              aria-label={user ? 'Your account' : 'Sign in'}
              title={user ? 'Account' : 'Sign in'}
            >
              <UserRound size={18} strokeWidth={2.2} />
            </button>

            {showStartFree && (
              <button
                type="button"
                className="btn-primary small hidden sm:inline-flex"
                onClick={() => go('/membership')}
              >
                Start free
              </button>
            )}

            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full"
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
          <div className="flex items-center justify-between px-5 pt-5 pb-4">
            <span className="inline-flex items-center gap-2.5 font-display font-extrabold text-[21px]">
              <LogoMark size={42} />
              <span>
                Fempire<span className="grad-text">.Love</span>
              </span>
            </span>
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full"
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

          <nav className="flex flex-col gap-1 px-5 pt-2" aria-label="Mobile">
            {navItems.map(({ label, route, Icon }) => {
              const active = current === route;
              return (
                <a
                  key={route}
                  href={route}
                  onClick={(e) => {
                    e.preventDefault();
                    go(route);
                  }}
                  className={`flex items-center gap-3 font-display font-bold text-[22px] py-3.5 no-underline ${
                    active ? 'text-cream' : 'text-cream/85'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={22} strokeWidth={2} className="text-bougain shrink-0" aria-hidden />
                  {label}
                </a>
              );
            })}

            <a
              href="/account"
              onClick={(e) => {
                e.preventDefault();
                go('/account');
              }}
              className="flex items-center gap-3 font-display font-bold text-[22px] py-3.5 text-cream no-underline"
            >
              <UserRound size={22} strokeWidth={2} className="text-bougain shrink-0" aria-hidden />
              {user ? 'Account' : 'Sign in'}
            </a>

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--glass-b)' }}>
              <a
                href="/vision"
                onClick={(e) => {
                  e.preventDefault();
                  go('/vision');
                }}
                className="block text-soft text-sm font-semibold py-2.5 no-underline"
              >
                Our vision
              </a>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  go('/contact');
                }}
                className="block text-soft text-sm font-semibold py-2.5 no-underline"
              >
                Contact
              </a>
            </div>

            {showStartFree && (
              <button type="button" className="btn-primary mt-6 w-full" onClick={() => go('/membership')}>
                Start free
              </button>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

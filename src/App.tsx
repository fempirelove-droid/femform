import { useEffect } from 'react';
import { MeshBackground } from '@/components/MeshBackground';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { HomePage } from '@/pages/HomePage';
import { MembershipPage } from '@/pages/MembershipPage';
import { ArticlePage } from '@/pages/ArticlePage';
import { CategoryPage } from '@/pages/CategoryPage';
import { VisionPage } from '@/pages/VisionPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { DisclaimerPage } from '@/pages/DisclaimerPage';
import { CoachPage } from '@/pages/CoachPage';
import { ContactPage } from '@/pages/ContactPage';
import { WebinarsPage } from '@/pages/WebinarsPage';
import { JourneyPage } from '@/pages/JourneyPage';
import { AccountPage } from '@/pages/AccountPage';
import { useRouter } from '@/hooks/useRouter';
import { useSEO } from '@/hooks/useSEO';

const STATIC_PAGES = new Set([
  '/',
  '/membership',
  '/vision',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/coach',
  '/contact',
  '/webinars',
  '/journey',
  '/account',
]);

function App() {
  const { current, navigate } = useRouter();
  const pathOnly = current.split('?')[0].split('#')[0] || '/';

  useSEO({
    title: 'Fempire.Love — A digital home for women of the Caribbean & beyond',
    description:
      'Fempire.Love is a warm, modern digital home for women across Curaçao, the Caribbean and the diaspora — hormones, the change, motherhood, mind and body, without judgement.',
  });

  useEffect(() => {
    if (pathOnly === '/') {
      const anchor = window.location.hash.split('#')[1];
      if (anchor) {
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0 });
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathOnly]);

  const renderPage = () => {
    if (STATIC_PAGES.has(pathOnly)) {
      switch (pathOnly) {
        case '/membership':
          return <MembershipPage navigate={navigate} />;
        case '/vision':
          return <VisionPage navigate={navigate} />;
        case '/privacy':
          return <PrivacyPage navigate={navigate} />;
        case '/terms':
          return <TermsPage navigate={navigate} />;
        case '/disclaimer':
          return <DisclaimerPage navigate={navigate} />;
        case '/coach':
          return <CoachPage navigate={navigate} />;
        case '/contact':
          return <ContactPage navigate={navigate} />;
        case '/webinars':
          return <WebinarsPage navigate={navigate} />;
        case '/journey':
          return <JourneyPage navigate={navigate} />;
        case '/account':
          return <AccountPage navigate={navigate} />;
        default:
          return <HomePage navigate={navigate} />;
      }
    }

    const segments = pathOnly.split('/').filter(Boolean);
    if (segments.length === 1) {
      return <CategoryPage navigate={navigate} categorySlug={segments[0]} />;
    }
    if (segments.length === 2) {
      return <ArticlePage navigate={navigate} slug={segments[1]} />;
    }

    return <HomePage navigate={navigate} />;
  };

  return (
    <>
      <MeshBackground />
      <Header onNavigate={navigate} current={pathOnly} />
      {renderPage()}
      <Footer onNavigate={navigate} />
      <CookieConsent />
    </>
  );
}

export default App;

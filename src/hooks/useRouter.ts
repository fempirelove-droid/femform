import { useEffect, useState, useCallback } from 'react';

export function useRouter() {
  const [path, setPath] = useState(() => {
    return window.location.pathname + window.location.search + window.location.hash;
  });

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname + window.location.search + window.location.hash);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((route: string) => {
    if (route.includes('#') && !route.startsWith('#')) {
      const [base, anchor] = route.split('#');
      const basePath = base || '/';
      window.history.pushState({}, '', basePath + (anchor ? '#' + anchor : ''));
      setPath(basePath + (anchor ? '#' + anchor : ''));
      if (anchor) {
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const clean = route.replace(/^#/, '');
      window.history.pushState({}, '', clean || '/');
      setPath(clean || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const current = path.split('#')[0].split('?')[0] || '/';

  return { path, current, navigate };
}

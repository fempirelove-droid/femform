import { useEffect } from 'react';
import type { NavigateFn } from '@/types';

type Props = { navigate: NavigateFn };

/** Legacy URL: membership pitch now lives on Community. */
export function MembershipPage({ navigate }: Props) {
  useEffect(() => {
    navigate('/community#join');
  }, [navigate]);

  return (
    <main className="min-h-[40vh] flex items-center justify-center">
      <p className="text-soft text-sm">Taking you to the Circle…</p>
    </main>
  );
}

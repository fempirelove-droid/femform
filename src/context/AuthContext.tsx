import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { MembershipTier } from '@/lib/types';

export type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  tier: MembershipTier;
  refreshProfile: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

function useAuthLocal(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<MembershipTier>('free');

  const refreshProfile = useCallback(async () => {
    const {
      data: { user: current },
    } = await supabase.auth.getUser();
    if (!current) {
      setTier('free');
      return;
    }
    const { data } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', current.id)
      .maybeSingle();
    setTier((data?.tier as MembershipTier) || 'free');
  }, []);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
      if (data.session?.user) refreshProfile();
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setUser(next?.user ?? null);
      setLoading(false);
      if (next?.user) refreshProfile();
      else setTier('free');
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [refreshProfile]);

  const signInWithMagicLink = async (email: string) => {
    const redirectTo = `${window.location.origin}/account`;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setTier('free');
  };

  return {
    user,
    session,
    loading,
    tier,
    refreshProfile,
    signInWithMagicLink,
    signOut,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useAuthLocal();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return ctx;
}

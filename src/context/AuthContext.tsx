"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UserProfile, UserRole } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phone: string) => Promise<void>;
  verifyOtp: (phone: string, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUserRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toUserProfile(supabaseUser: any, profile: any): UserProfile {
  return {
    uid: supabaseUser.id,
    name: profile?.name ?? supabaseUser.user_metadata?.full_name ?? supabaseUser.user_metadata?.name ?? 'User',
    email: profile?.email ?? supabaseUser.email ?? null,
    phone: profile?.phone ?? supabaseUser.phone ?? null,
    photoURL: profile?.photo_url ?? supabaseUser.user_metadata?.avatar_url ?? null,
    city: profile?.city ?? null,
    country: profile?.country ?? 'IN',
    roles: profile?.roles ?? ['consumer'],
    halalCoinsBalance: profile?.halal_coins_balance ?? 50,
    createdAt: profile?.created_at ? new Date(profile.created_at) as any : new Date() as any,
    lastLoginAt: new Date() as any,
  };
}

const DEV_USER: UserProfile = {
  uid: "dev-user-id",
  name: "Dev User",
  email: "dev@halalhub.local",
  phone: "+919999999999",
  photoURL: null,
  city: "Mumbai",
  country: "IN",
  roles: ["consumer", "business_owner", "creator", "admin"],
  halalCoinsBalance: 5000,
  createdAt: new Date() as any,
  lastLoginAt: new Date() as any,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isDev = typeof window !== "undefined" && window.location.hostname === "localhost";
  const [user, setUser] = useState<UserProfile | null>(isDev ? DEV_USER : null);
  const [loading, setLoading] = useState(!isDev);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (isDev) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUser(toUserProfile(session.user, profile));

        // Award daily login coins once per calendar day
        if (event === 'SIGNED_IN') {
          import('@/lib/gamification/award-coins').then(({ awardCoins }) => {
            awardCoins(session.user.id, 'daily_login').catch(() => {})
          })
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (isDev) return;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin}/auth/callback`,
      },
    });
  };

  const signInWithPhone = async (phone: string) => {
    if (isDev) return;
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) throw error;
  };

  const verifyOtp = async (phone: string, otp: string) => {
    if (isDev) { router.push('/account/dashboard'); return; }
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
    if (error) throw error;
    router.push('/account/dashboard');
  };

  const signOut = async () => {
    if (isDev) return;
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  const setUserRole = (role: UserRole) => {
    if (user) setUser({ ...user, roles: [role] });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithPhone, verifyOtp, signOut, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

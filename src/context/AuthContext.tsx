
"use client";

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  User as FirebaseUser, 
  ConfirmationResult
} from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { UserProfile, UserRole } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  setupRecaptcha: (elementId: string) => Promise<any | undefined>;
  signInWithPhone: (phoneNumber: string, appVerifier: any) => Promise<ConfirmationResult | undefined>;
  verifyOtp: (confirmationResult: ConfirmationResult, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUserRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const mockUser: UserProfile = {
  uid: 'mock-user-id',
  name: 'Super Admin',
  email: 'admin@example.com',
  phone: '+1234567890',
  photoURL: 'https://images.unsplash.com/photo-1612307057748-b44842539a29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8TXVzbGltJTIwZ2lybHxlbnwwfHx8fDE3NjUxOTk0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  city: 'Delhi',
  country: 'IN',
  roles: ['super_admin'],
  halalCoinsBalance: 100,
  createdAt: new Date() as any,
  lastLoginAt: new Date() as any,
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(mockUser);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUserSignIn = useCallback(async (firebaseUser: FirebaseUser) => {
    // This logic is bypassed when using mock user
  }, []);

  useEffect(() => {
    // Bypassing real auth check for mock user
    setLoading(false);
  }, []);

  const signInWithGoogle = async () => {
    console.log("signInWithGoogle called, but we are using a mock user.");
  };

  const setupRecaptcha = async (elementId: string) => {
    console.log("setupRecaptcha called, but we are using a mock user.");
    return undefined;
  }

  const signInWithPhone = async (phoneNumber: string, appVerifier: any) => {
    console.log("signInWithPhone called, but we are using a mock user.");
    return undefined;
  }

  const verifyOtp = async (confirmationResult: ConfirmationResult, otp: string) => {
    console.log("verifyOtp called, but we are using a mock user.");
  }

  const signOut = async () => {
    console.log("signOut called, but we are using a mock user.");
    setUser(null); // In a real app, you'd also call firebaseSignOut
    router.push('/login'); // Redirect to login after "signing out"
  };

  const setUserRole = (role: UserRole) => {
    if (user) {
        setUser({ ...user, roles: [role] });
    }
  }
  
  const value = {
    user,
    loading,
    signInWithGoogle,
    setupRecaptcha,
    signInWithPhone,
    verifyOtp,
    signOut,
    setUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

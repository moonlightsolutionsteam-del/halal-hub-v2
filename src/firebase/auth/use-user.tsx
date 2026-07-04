
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

import { useAuth } from '../provider';
import { UserProfile } from '@/lib/types';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // In a real app, you would fetch the user profile from Firestore here
        // For now, we'll create a mock profile
        const mockProfile: UserProfile = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            phone: user.phoneNumber,
            photoURL: user.photoURL,
            city: 'Delhi',
            country: 'IN',
            roles: ['consumer'],
            halalCoinsBalance: 100,
            createdAt: new Date() as any, // In real app use serverTimestamp()
            lastLoginAt: new Date() as any, // In real app use serverTimestamp()
        };
        setUserProfile(mockProfile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, userProfile, loading };
}

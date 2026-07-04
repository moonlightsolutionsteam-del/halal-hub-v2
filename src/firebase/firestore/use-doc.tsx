
'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, doc, DocumentReference } from 'firebase/firestore';

import { useFirestore } from '../provider';

export function useDoc<T>(ref: DocumentReference | string) {
  const db = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) return;

    const docRef = typeof ref === 'string' ? doc(db, ref) : ref;

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setData({ id: doc.id, ...doc.data() } as T);
      } else {
        setData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, ref]);

  return { data, loading };
}

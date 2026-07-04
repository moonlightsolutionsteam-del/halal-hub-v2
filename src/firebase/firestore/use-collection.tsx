
'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, collection, Query, CollectionReference } from 'firebase/firestore';

import { useFirestore } from '../provider';

export function useCollection<T>(ref: CollectionReference | Query | string) {
  const db = useFirestore();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) return;

    const colRef = typeof ref === 'string' ? collection(db, ref) : ref;

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const result: T[] = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() } as T);
      });
      setData(result);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, ref]);

  return { data, loading };
}

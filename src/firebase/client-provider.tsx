
'use client';

import { FirebaseProvider, initializeFirebase } from '.';

const firebase = initializeFirebase();

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}

/**
 * Exports all Firebase Auth users to firebase-auth-users.json
 * Uses the service account — no Firebase CLI needed.
 */
import * as adminNS from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { cert, initializeApp } from 'firebase-admin/app';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccount.json'), 'utf8'));

initializeApp({ credential: cert(serviceAccount) });

async function exportUsers() {
  const users = [];
  let pageToken;

  do {
    const result = await getAuth().listUsers(1000, pageToken);
    users.push(...result.users.map(u => u.toJSON()));
    pageToken = result.pageToken;
  } while (pageToken);

  const output = { users };
  writeFileSync(join(__dirname, 'firebase-auth-users.json'), JSON.stringify(output, null, 2));
  console.log(`✓ Exported ${users.length} users to firebase-auth-users.json`);

  // Summary
  const withPhone = users.filter(u => u.phoneNumber).length;
  const withEmail = users.filter(u => u.email).length;
  const withGoogle = users.filter(u => u.providerData?.some(p => p.providerId === 'google.com')).length;
  console.log(`  Phone: ${withPhone}, Email: ${withEmail}, Google: ${withGoogle}`);

  process.exit(0);
}

exportUsers().catch(err => {
  console.error('[FATAL]', err.message);
  process.exit(1);
});

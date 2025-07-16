// app/publications/page.tsx
import { redirect } from 'next/navigation';
import { getPublications } from '@/sanity/sanity-utils';

export default async function PublicationsPage() {
  const publications = await getPublications();

  if (!publications || publications.length === 0) {
    redirect('/404'); // or some fallback
  }

  const sorted = [...publications].sort((a, b) => (b.sortOrder ?? 0) - (a.sortOrder ?? 0));
  const mostRecent = sorted[0];

  // Server-side redirect — no visible blank page
  redirect(`/publications/${mostRecent.slug}`);
}

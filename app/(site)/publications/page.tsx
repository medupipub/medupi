// app/publications/page.tsx
import { redirect } from 'next/navigation';
import { getPublications } from '@/sanity/sanity-utils';

export const revalidate = 300; // 5 minutes instead of 60 seconds

export default async function PublicationsPage() {
  const publications = await getPublications();

  if (!publications || publications.length === 0) {
    redirect('/404');
  }

  const mostRecent = publications[0]; // If your query is already sorted
  redirect(`/publications/${mostRecent.slug}`);
}
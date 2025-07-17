// components/PublicationsLink.tsx
import Link from 'next/link';
import { getPublications } from '@/sanity/sanity-utils';

export default async function PublicationsLink() {
  const publications = await getPublications();
  
  if (!publications || publications.length === 0) {
    return <p className="md:text-[clamp(1rem,2vw,1.5rem)]">Publications</p>;
  }

  const sorted = [...publications].sort((a, b) => (b.sortOrder ?? 0) - (a.sortOrder ?? 0));
  const mostRecentSlug = sorted[0].slug;

  return (
    <Link href={`/publications/${mostRecentSlug}`}>
      <p className="md:text-[clamp(1rem,2vw,1.5rem)]">Publications</p>
    </Link>
  );
}
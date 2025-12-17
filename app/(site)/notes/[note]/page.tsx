// app/(site)/notes/[note]/page.tsx

import { getNote } from '@/sanity/sanity-utils';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

// Add this line - revalidate every 60 seconds
export const revalidate = 60;

type Props = {
  params: Promise<{ note: string }>;
};

export default async function SingleNotePage({ params }: Props) {
  // Await the params Promise
  const { note } = await params;
  const noteData = await getNote(note);

  if (!noteData) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{noteData.title}</h1>
      <div className="mt-6 prose">
        <PortableText value={noteData.eventDescription} />
      </div>
    </div>
  );
}
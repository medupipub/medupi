// app/(site)/announcements/[announcement]/page.tsx

import { getAnnouncement } from '@/sanity/sanity-utils';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

// Add this line - revalidate every 60 seconds
export const revalidate = 60;

type Props = {
  params: Promise<{ announcement: string }>;
};

export default async function SingleAnnouncementPage({ params }: Props) {
  // Await the params Promise
  const { announcement } = await params;
  const announcementData = await getAnnouncement(announcement);

  if (!announcementData) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{announcementData.title}</h1>

      <div className="mt-6 prose">
        <PortableText value={announcementData.eventDescription} />
      </div>
    </div>
  );
}
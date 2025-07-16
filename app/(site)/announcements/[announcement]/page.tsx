// app/(site)/announcements/[announcement]/page.tsx

import { getAnnouncement } from '@/sanity/sanity-utils';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

type Props = {
  params: { announcement: string };
};

export default async function SingleAnnouncementPage({ params }: Props) {
  const announcement = await getAnnouncement(params.announcement);

  if (!announcement) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{announcement.title}</h1>

      <div className="mt-6 prose">
        <PortableText value={announcement.eventDescription} />
      </div>
    </div>
  );
}

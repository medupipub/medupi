'use client';

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('./PdfViewer'), { ssr: false });

type NotesPdfClientProps = {
  url: string;
  title?: string;
};

export default function NotesPdfClient({ url, title }: NotesPdfClientProps) {
  return <PdfViewer url={url} title={title} />;
}

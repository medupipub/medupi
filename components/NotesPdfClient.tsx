'use client';

import dynamic from 'next/dynamic';

// This is the key: ssr: false prevents the "Module not found" error during build
const PdfViewer = dynamic(() => import('./PdfViewer'), { 
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center border border-dashed border-black/20 italic opacity-50">
      Loading PDF Viewer...
    </div>
  )
});

export default function NotesPdfClient({ url, title }: { url: string; title: string }) {
  return (
    <div className="w-full flex justify-center">
      <PdfViewer url={url} title={title} />
    </div>
  );
}
// components/PdfEmbed.tsx
'use client';

import { useState } from 'react';

type PdfEmbedProps = {
  url: string;
  title?: string;
};

export default function PdfEmbed({ url, title }: PdfEmbedProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Construct PDF URL with page parameter and minimal toolbar
  const pdfUrl = `${url}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0`;

  return (
    <div className="w-full flex flex-col items-center space-y-3">
      {/* PDF Viewer Container */}
      <div className="w-full aspect-[1/1.414] border border-gray-300 shadow-sm bg-white overflow-hidden">
        <iframe
          src={pdfUrl}
          title={title || 'PDF Viewer'}
          className="w-full h-full"
          loading="lazy"
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span className="text-sm text-gray-600">
          Page {currentPage}
        </span>
        
        <button
          onClick={goToNextPage}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          aria-label="Next page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Download Link */}
      <a
        href={url}
        download
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 underline transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download PDF
      </a>
    </div>
  );
}
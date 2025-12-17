'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// 1. Use the "legacy" build for better compatibility with Next.js/Webpack
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Inside PdfViewer.tsx
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/legacy/build/pdf.worker.min.mjs`;
type PdfViewerProps = {
  url: string;
  title?: string;
};

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState<number>(400);

  // Handle responsive width calculation safely
  useEffect(() => {
    const updateWidth = () => {
      const el = document.getElementById('pdf-wrapper');
      if (el) setContainerWidth(el.clientWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div id="pdf-wrapper" className="w-full flex flex-col items-center">
      <div className="border border-gray-300 shadow-lg bg-white overflow-hidden">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="p-10 italic">Opening document...</div>}
        >
          <Page 
            pageNumber={currentPage} 
            width={containerWidth}
            renderAnnotationLayer={true}
            renderTextLayer={true}
          />
        </Document>
      </div>

      <div className="flex items-center gap-6 mt-6 py-2 px-4 rounded-lg bg-gray-50 border border-gray-200">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage <= 1}
          className="text-xl disabled:opacity-20 hover:text-blue-600 transition-colors"
        >
          ←
        </button>
        <p className="text-sm font-medium">
          {currentPage} / {numPages || '--'}
        </p>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, numPages || 1))}
          disabled={numPages ? currentPage >= numPages : false}
          className="text-xl disabled:opacity-20 hover:text-blue-600 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}
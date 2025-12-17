'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// Note: In v9, these CSS imports are still required
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Updated worker source to match your specific version 4.4.168
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

export default function PdfViewer({ url }: { url: string; title?: string }) {
  // Explicitly typing numPages to avoid the 'any' error
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [renderHeight, setRenderHeight] = useState<number>(650);

  useEffect(() => {
    const calculateSize = () => {
      const vh = window.innerHeight * 0.60; 
      setRenderHeight(vh);
    };
    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, []);

  // Fix for the 'numPages' has an 'any' type error
  function onDocumentLoadSuccess(pdf: { numPages: number }): void {
    setNumPages(pdf.numPages);
  }

  return (
    <div className="w-fit flex flex-col items-start">
      <div className="bg-white shadow-sm border border-black/5 overflow-hidden">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess} // Using the typed function here
          loading={<div className="p-10 text-xs lowercase italic">loading...</div>}
        >
          <Page 
            pageNumber={currentPage} 
            height={renderHeight}
            renderAnnotationLayer={true}
            renderTextLayer={true}
            className="block"
          />
        </Document>
      </div>

      <div className="mt-3 flex flex-col gap-1 text-sm font-normal lowercase w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage <= 1}
              className="hover:opacity-50 disabled:opacity-10 transition-opacity text-xl leading-none"
            >
              ←
            </button>
            <span className="tabular-nums text-[12px] pt-1">{currentPage} / {numPages || '--'}</span>
            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, numPages || 1))}
              disabled={numPages ? currentPage >= numPages : false}
              className="hover:opacity-50 disabled:opacity-10 transition-opacity text-xl leading-none"
            >
              →
            </button>
          </div>

          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline italic text-[11px] opacity-70"
          >
            download pdf
          </a>
        </div>
      </div>
    </div>
  );
}
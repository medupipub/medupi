'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

export default function PdfViewer({ url }: { url: string; title?: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfWidth, setPdfWidth] = useState<number>(450); // Default for mobile

useEffect(() => {
  const handleResize = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    if (vw >= 1536) {
      // STEP 5: Large Desktop (Ultra-wide/High-res)
      setPdfWidth(Math.floor((vh * 0.70) * 0.707));
    } else if (vw >= 995) {
      // STEP 1: Standard Desktop (13" Laptops, etc.)
      setPdfWidth(Math.floor((vh * 0.60) * 0.707));
    } else if (vw >= 600) {
      // STEP 2: Large Mobile/Tablet
      setPdfWidth(450);
    } else if (vw >= 400) {
      // STEP 3: Standard Mobile
      setPdfWidth(350);
    } else {
      // STEP 4: Small Mobile
      setPdfWidth(290);
    }
  };

  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  function onDocumentLoadSuccess(pdf: { numPages: number }): void {
    setNumPages(pdf.numPages);
  }

  return (
    <div className="flex flex-col items-center min-[995px]:items-start">
      <div className="bg-white shadow-sm border border-black/5 overflow-hidden">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess} // Now it can find this function
          loading={<div className="p-10 text-xs lowercase italic">loading...</div>}
        >
          <Page
            pageNumber={currentPage}
            width={pdfWidth} // Explicit width prevents cropping
            renderAnnotationLayer={true}
            renderTextLayer={true}
            className="block"
          />
        </Document>
      </div>

      {/* Minimalist Controls */}
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
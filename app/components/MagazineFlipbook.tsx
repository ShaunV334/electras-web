"use client";

import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2 } from 'lucide-react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PageProps {
  pageNumber: number;
  width: number;
}

const PageComponent = React.forwardRef<HTMLDivElement, PageProps>(
  ({ pageNumber, width }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-neutral-900 shadow-2xl flex justify-center items-start overflow-hidden w-full h-full"
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={width}
          className="pointer-events-none flex justify-center items-start w-full h-full"
        />
      </div>
    );
  }
);
PageComponent.displayName = 'PageComponent';

export default function MagazineFlipbook() {
  const [numPages, setNumPages] = useState<number>(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  if (windowSize.width === 0) return null;

  const isMobile = windowSize.width < 768;

  let bookWidth = 0;
  let bookHeight = 0;

  // Aspect ratio of a standard magazine is roughly 1 : 1.414 (A4)
  const aspectRatio = 1.414;

  if (isMobile) {
    // Single page mode for mobile
    bookWidth = windowSize.width - 40; // 20px padding on sides
    bookHeight = bookWidth * aspectRatio;
  } else {
    // Two pages side-by-side for desktop/tablet
    // We want the total width (bookWidth * 2) to fit in the window, with some padding
    bookWidth = (windowSize.width - 80) / 2;
    bookHeight = bookWidth * aspectRatio;
  }

  // Cap the size based on window height so it fits on screen
  const maxHeight = windowSize.height * 0.8; // 80% of viewport height
  if (bookHeight > maxHeight) {
    bookHeight = maxHeight;
    bookWidth = bookHeight / aspectRatio;
  }

  return (
    <div className="w-full flex justify-center items-center py-10 overflow-hidden">
      <div className="flex justify-center items-center w-full mx-auto px-4 z-20">
        <Document
          file="/ECS-MAGAZINE-optimized.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center text-white gap-4 h-64">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-gray-400">Loading Magazine...</p>
            </div>
          }
          className="flex justify-center w-full"
        >
          {numPages > 0 && (
            // @ts-ignore - react-pageflip TS types are outdated and clash slightly with React 19 forwardRef
            <HTMLFlipBook
              width={bookWidth - 5}
              height={bookHeight - 5}
              size="fixed"
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              usePortrait={isMobile}
              className="magazine-flipbook mx-auto drop-shadow-2xl"
              style={{ margin: "0 auto" }}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <PageComponent
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={bookWidth}
                />
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>
    </div>
  );
}

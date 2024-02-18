import React, { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

// Import the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ file }: { file: any }) => {
const [numPages, setNumPages] = useState(0);

function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
}

  return (
    <div>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(
          new Array(numPages),
          (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          ),
        )}
      </Document>
    </div>
  );
};

export default PDFViewer;
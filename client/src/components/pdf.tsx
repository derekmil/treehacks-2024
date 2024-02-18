import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// You might need to specify the workerSrc to avoid issues in certain setups
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ filePath }: {filePath: string | undefined}) => {
  const [numPages, setNumPages] = useState(0);

  function onDocumentLoadSuccess({ numPages } : {numPages: number}) {
    setNumPages(numPages);
  }

  return (
      <Document
        file={filePath}
        onLoadSuccess={onDocumentLoadSuccess}
        className={"flex-col w-[1300px] h-[792px] overflow-auto border-2 border-gray-300 rounded-md"}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false}/>
        ))}
      </Document>
  );
};

export default PDFViewer;

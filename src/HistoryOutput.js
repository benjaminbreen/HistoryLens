import React, { useState, useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import EntityList from './EntityList';
import { initialInventoryData } from './initialInventory';
import PDFPopup from './PDFPopup';

import './App.css';

const HistoryOutput = React.memo(({ historyOutput, isLoading, }) => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [selectedPdfPath, setSelectedPdfPath] = useState('');
  const [selectedCitation, setSelectedCitation] = useState('');
  const [relevantPDFs, setRelevantPDFs] = useState([]);

  const handlePDFClick = useCallback((pdfPath, citation) => {
    setSelectedPdfPath(pdfPath);
    setSelectedCitation(citation);
    setIsPdfOpen(true);
  }, []);

  const processTextWithPDFLinks = useMemo(() => {
    const allItemsWithPdf = [
      ...EntityList.filter(entity => entity.pdf),
      ...initialInventoryData.filter(item => item.pdf)
    ];
    const pattern = new RegExp(`\\b(${allItemsWithPdf.map(item => item.name).join('|')})\\b`, 'gi');
    
    return (text) => {
      const mentionedItems = new Set();
      const processedText = text.replace(pattern, (match) => {
        const item = allItemsWithPdf.find(item => item.name.toLowerCase() === match.toLowerCase());
        if (item) {
          mentionedItems.add(item);
          return `[${match} 📄](/pdfs/${item.pdf} "${item.citation || ''}")`;
        }
        return match;
      });
      setRelevantPDFs(Array.from(mentionedItems));
      return processedText;
    };
  }, []);

  const processedText = useMemo(() => {
    if (isLoading || !historyOutput) return '';
    const trimmedOutput = historyOutput.replace(/\*\*.*\*\*\s*$/, '');
    return processTextWithPDFLinks(trimmedOutput);
  }, [historyOutput, isLoading, processTextWithPDFLinks]);

  // Memoize the PDF link to avoid re-rendering it unnecessarily
  const PdfLink = React.memo(({ node, ...props }) => (
    <span 
      className="pdf-link" 
      onClick={() => handlePDFClick(props.href, props.title)}
    >
      {props.children}
    </span>
  ));

  if (isLoading) {
    return <div>Loading...</div>;
  }




  return (
    <div className="history-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: PdfLink
        }}
      >
        {processedText}
      </ReactMarkdown>
      <div className="pdf-buttons">
        {relevantPDFs.map(item => (
          <button 
            key={item.name}
            onClick={() => handlePDFClick(`/pdfs/${item.pdf}`, item.citation)}
            className="pdf-link-button"
          >
            {item.name} 📄
          </button>
        ))}
      </div>
      {isPdfOpen && (
        <PDFPopup
          isOpen={isPdfOpen}
          onClose={() => setIsPdfOpen(false)}
          pdfPath={selectedPdfPath}
          citation={selectedCitation}
        />
      )}
    </div>
  );
});


export default HistoryOutput;
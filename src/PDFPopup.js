import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Import the GFM plugin for markdown
import './PDFPopup.css';

const PDFPopup = ({ isOpen, onClose, pdfPath, citation }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="pdf-popup-overlay" onClick={onClose}>
      <div className="pdf-popup-content" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={pdfPath}
          width="70%"
          height="80vh"
          title="PDF Viewer"
          frameBorder="0"
        />
        <button className="close-popup" onClick={onClose}>
          Close
        </button>
        <div className="citation">
        <h4>Citation:</h4>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {citation}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PDFPopup;

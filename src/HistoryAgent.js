import React from 'react';
import ReactMarkdown from 'react-markdown';

function HistoryAgent({ output }) {
  return (
    <div className="w-full max-w-2xl bg-gradient-to-r from-blue-50 to-blue-100 shadow-md rounded p-4 mb-4">
      <h2 className="text-2xl font-semibold mb-2 text-blue-900"></h2>
      <div className="min-h-48 border border-gray-300 rounded p-4 bg-white text-gray-800">
        <ReactMarkdown
          className="prose"
          components={{
            p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          }}
        >
          {output || 'Waiting for input...'}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default HistoryAgent;

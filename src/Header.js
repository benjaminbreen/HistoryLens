import React from 'react';
import './App.css';

function Header() {
  return (
    <header className="header-container">
      <div className="title-container">
        <h1 className="title">HistoryLens:</h1>
        <h2 className="subtitle">1680s APOTHECARY SIMULATOR</h2>
      </div>
      <div className="description-container">
        <p className="description">
          An experimental, LLM-based educational game about early modern medicine.
        </p>
      </div>
      <hr className="header-divider" />
    </header>
  );
}

export default Header;

import React from 'react';
import './App.css';

function Header() {
  return (
    <header className="header-container">
      <div className="title-container">
        <h1 className="title">HistoryLens:</h1>
        <h2 className="subtitle">17th Century Apothecary Simulator</h2>
      </div>
      <div className="description-container">
        <p className="description">
          Experience a day in the life of an apothecary in 1680s Mexico City.
        </p>
      </div>
      <hr className="header-divider" />
    </header>
  );
}

export default Header;

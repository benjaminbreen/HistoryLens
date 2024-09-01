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
          Experience life as an apothecary navigating a summer day in 17th-century Mexico City.
        </p>
      </div>
      <hr className="header-divider" />
    </header>
  );
}

export default Header;

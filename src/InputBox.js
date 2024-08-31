import React from 'react';
import './InputBox.css';

function InputBox({ userInput, setUserInput, handleSubmit, disabled }) {

  // Function to handle keydown event
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line
      handleSubmit(e); // Submits the form
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-box-form">
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown} // Attach the keydown handler
        placeholder="Enter your next move here..."
        className="input-box-textarea"
        disabled={disabled}
        rows={2} // Initial number of rows
      />
      <button type="submit" className="input-box-button" disabled={disabled}>
        Submit
      </button>
    </form>
  );
}

export default InputBox;

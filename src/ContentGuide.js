import React, { useEffect } from 'react';
import './ContentGuide.css';
import primarySource1 from './assets/humors.jpg'; // Example image import
import primarySource2 from './assets/codex.jpg'; // Example image import

const ContentGuide = ({ isOpen, toggleContentGuide }) => {

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (e.target.className === 'content-guide-popup') {
        toggleContentGuide();
      }
    };

    // Add event listener to close content guide when clicking outside of the content box
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up event listener when component is unmounted or isOpen changes
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, toggleContentGuide]);

  if (!isOpen) return null;

  return (
    <div className="content-guide-popup">
      <div className="content-guide-content">
        <h1>What is the historical context for this simulation?</h1>
        <p>
          The practice of apothecaries in the 17th century was rooted in a blend of empirical knowledge, tradition, and mysticism. Maria de Lima, your character in this game, embodies the challenges and opportunities faced by real-life apothecaries in colonial Mexico City.
        </p>
        <h2>The Role of Apothecaries</h2>
        <p>
          Apothecaries were the primary providers of medical treatment in their communities, often blending medicinal herbs, minerals, and other substances to create remedies. They played a crucial role in the dissemination of medical knowledge and often acted as the first point of contact for the sick.
        </p>
        <img src={primarySource1} alt="A depiction of the four humors from a 16th century German printed book" className="content-guide-image" />
        <h2>Colonial Mexico's Medical Practices</h2>
        <p>
          In colonial Mexico, medicine was influenced by a combination of Indigenous, European, and African healing traditions. The blending of these traditions created a unique medical landscape where apothecaries like Maria navigated complex social and cultural dynamics.
        </p>
        <img src={primarySource2} alt="Medical practices in colonial Mexico" className="content-guide-image" />
        <h2>Materia Medica</h2>
        <p>
          The term 'Materia Medica' refers to the body of collected knowledge about the therapeutic properties of any substance used for healing (i.e., medicines). Maria's shop contains a wide array of these substances, from common herbs like aloe to exotic ingredients like powdered millipedes.
        </p>
        <h2>The Real Maria de Lima</h2>
        <p>
          Maria de Lima is based on a real-life apothecary named Maria Coelho, who lived in 17th-century Coimbra, Portugal. Maria Coelho was part of a family of converso apothecaries, who were descendants of Sephardic Jews forced to convert to Christianity. Maria's father, Filipe Coelho, was also an apothecary, and her brother Jozeph Coelho created a remarkable manuscript known as the "Pharmaca de Jozeph Coelho." This manuscript, filled with both medical knowledge and artistic doodles, provides a rare glimpse into the world of early modern apothecaries.
        </p>
        <p>
          The Coelho family operated their apothecary shop on Rua Larga, in the Portuguese town of Coimbra, which was closely tied to the University of Coimbra's School of Medicine. Maria Coelho herself was arrested by the Inquisition in 1666 on charges of judaísmo (retaining Jewish customs). After three years of imprisonment, she was deported to Brazil as a criminal, and her fate remains unknown. The manuscript's drawings of a "Boticario" and "Botica[ria]" (male and female apothecaries) are believed to be a tribute to Maria by her brother, Jozeph, who may never have seen her again.
        </p>
        <button className="close-content-guide-button" onClick={toggleContentGuide}>Close</button>
      </div>
    </div>
  );
};

export default ContentGuide;

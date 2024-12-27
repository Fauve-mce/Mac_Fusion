import React, { useState } from 'react';
import './styles/Footer.css';
import noteImage from '../assets/img/block-note.png';
import spotifyImage from '../assets/img/spotify.png';
import todoIstImage from '../assets/img/TodoIst2.webp';
import galleryImage from '../assets/img/Gallery.png';

const Footer = ({ toggleTodoVisibility }) => {
  // État pour afficher ou cacher la modale
  const [isModalOpen, setModalOpen] = useState(false);

  // Fonction pour ouvrir la modale
  const openModal = () => {
    setModalOpen(true);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <footer>
      <div className="barre-nav">
        <div className="cube-note" onClick={toggleTodoVisibility}>
          <img src={noteImage} alt="Note"/>
        </div>
        <div className="cube-spotify">
          <img src={spotifyImage} alt="Spotify"/>
        </div>
        <div className="cube-gallery">
          <img src={galleryImage} alt="Gallery"/>
        </div>
        <div className="cube-météo" id="popupButton"></div>
        <div className="cube-TodoList2" onClick={toggleTodoVisibility}>
          <img src={todoIstImage} alt="TodoIst"/>
        </div>
      </div>
    </footer>
  );
};

// Fonction pour minimiser la fenêtre modale
const minimizeModal = () => {
  console.log('Minimizing modal...');
  // Ajouter la logique pour minimiser la fenêtre
};

// Fonction pour maximiser la fenêtre modale
const maximizeModal = () => {
  console.log('Maximizing modal...');
  // Ajouter la logique pour maximiser la fenêtre
};

export default Footer;

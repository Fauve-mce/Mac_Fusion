// src/Navbar.jsx
import React from "react";
import './styles/Navbar.css'; 

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="window-buttons">
        <div className="window-button red"></div>
        <div className="window-button yellow"></div>
        <div className="window-button green"></div>
      </div>
      <ul>
        <li className="icon"><i className="fas fa-apple"></i></li>
        <li><a href="#">Finder</a></li>
        <li><a href="#">Fichier</a></li>
        <li><a href="#">Édition</a></li>
        <li><a href="#">Affichage</a></li>
        <li><a href="#">Aller</a></li>
        <li><a href="#">Fenêtre</a></li>
        <li><a href="#">Aide</a></li>
      </ul>
    </div>
  );
};

export default Navbar;

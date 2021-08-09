import React from 'react';
import { NavLink } from 'react-router-dom';
import './pageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="main-container">
      <div className="container">
        <h1 className="sorry-title">SORRY!</h1>
        <h2 className="page-not-found">Page Not Found</h2>
        <NavLink to="/pokemons" className="back-button">
          POKEDEX
        </NavLink>
      </div>
    </div>
  );
};

export default PageNotFound;

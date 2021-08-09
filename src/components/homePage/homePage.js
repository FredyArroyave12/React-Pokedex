import React from 'react';
import NavBar from '../navBar';
import { NavLink } from 'react-router-dom';
import './homePage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <NavBar isSearchActive={false} />
      <div className="home-container">
        <div className="home-card">
          <div className="home-message-container">
            <h1 className="home-message">WELCOME TO THE POKEDEX</h1>
            <NavLink to="/pokemons" className="home-button"></NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

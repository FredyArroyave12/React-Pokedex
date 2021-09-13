import React from 'react';
import NavBar from '../navBar';
import { NavLink } from 'react-router-dom';
import pikabg from '../../images/pikaBg.gif';

const HomePage = () => {
  return (
    <div className="relative">
      <img
        className=" absolute bg-no-repeat bg-fixed bg-cover h-screen w-full  bg-center object-cover "
        src={pikabg}
        alt="pikabg"
      />
      <NavBar isSearchActive={false} />
      <div>
        <div className="static rounded-lg top-2/4 left-2/4 half-width half-height bg-lightwhite -translate-x-1/2 -translate-y-1/2 ">
          <div className="flex flex-col justify-center items-center w-full h-full mt-40 ">
            <h1 className="text-5xl text-center text-white m-0 p-0 z-20">
              WELCOME TO THE POKEDEX
            </h1>
            <NavLink
              to="/pokemons"
              className=" z-20 no-underline bg-center bg-no-repeat h-64 mt-20 rounded-lg text-white w-64 px-40 py-8 btn-bg hover:bg-center hover:bg-no-repeat hover:text-redish hover:btn-bg"
            ></NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { NavLink } from 'react-router-dom';
import sadPikachu from '../../images/sadPikachu.jpeg';

const PageNotFound = () => {
  return (
    <div className="h-screen relative">
      <img
        className="absolute bg-no-repeat bg-fixed bg-cover h-screen w-full  bg-center object-cover"
        src={sadPikachu}
        alt="sadPikachu"
      />
      <div className=" flex flex-col justify-center items-center h-full  text-lightblack bg-center">
        <h1 className="m-0 mb-56 text-7xl	z-20">SORRY!</h1>
        <h2 className="m-0 text-6xl z-20">Page Not Found</h2>
        <NavLink
          to="/pokemons"
          className="mt-20 p-4 cursor-pointer font-semibold no-underline border border-solid rounded-lg text-lightblack border-grayborder bg-navbar z-20"
        >
          POKEDEX
        </NavLink>
      </div>
    </div>
  );
};

export default PageNotFound;

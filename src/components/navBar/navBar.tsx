import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../../images/pokedex.png';
import { connect, RootStateOrAny } from 'react-redux';
import {
  updateSearch,
  changeMobileItemsStatus,
} from '../../redux/actions/navBarActions';

const NavBar = (props: {
  updateSearch: (arg0: string) => void;
  changeMobileItemsStatus: () => void;
  isSearchActive: boolean;
  navBar: { isMobileItemsActive: boolean };
}) => {
  console.log(props);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.updateSearch(event.target.value.toLowerCase());
  };

  const changeMobileItemsStatus = () => {
    props.changeMobileItemsStatus();
  };

  return (
    <div className="sticky flex flex-col items-end justify-center top-0 left-0 z-10">
      <nav className="w-screen h-16 flex justify-between bg-navbar shadow-nav-shadow">
        <div className="hidden md:flex md:items-center md:m-0 md:w-full">
          <NavLink to="/" className="m-0 pl-8">
            <img src={icon} alt="PokéDex" className="h-12" />
          </NavLink>
          <NavLink
            to="/pokemons"
            className="no-underline p-0 h-px ml-12 mb-4 text-white"
          >
            Pokemons
          </NavLink>
        </div>
        <button
          className="inline cursor-pointer bg-transparent border-opacity-0 outline-none ml-4  md:ml-4 md:hidden"
          onClick={changeMobileItemsStatus}
        >
          <span className="block w-8 h-1 bg-white mb-1.5 mx-2 my-0 " />
          <span className="block w-8 h-1 bg-white mb-1.5 mx-2 my-0 " />
          <span className="block w-8 h-1 bg-white mb-1.5 mx-2 my-0 " />
        </button>
        {props.isSearchActive && (
          <input
            className="m-4 pr-8 rounded-lg"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
        )}
      </nav>
      {props.navBar.isMobileItemsActive && (
        <div className="w-screen p-4 flex flex-col bg-white shadow-nav-shadow md:hidden">
          <NavLink
            className="mt-2 p-2 block text-center no-underline text-lightblack md:mt-2 md:p-2 md:block md:text-center md:no-underline md:text-lightblack"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="mt-2 p-2 block text-center no-underline text-lightblack"
            to="/pokemons"
          >
            Pokémons
          </NavLink>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => {
  return state;
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload?: { searchContent: string };
  }) => void
) => {
  return {
    updateSearch: (text: string) => dispatch(updateSearch(text)),
    changeMobileItemsStatus: () => dispatch(changeMobileItemsStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

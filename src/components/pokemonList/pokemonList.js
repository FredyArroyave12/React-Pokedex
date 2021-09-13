import React from 'react';
import { connect } from 'react-redux';
import utils from '../../utils';
import {
  selectPokemon,
  fetchPokemonList,
  fetchPokemon,
  fetchPokemonSpecies,
  updateLoadPokemon,
} from '../../redux/actions/pokemonActions';
import PokemonModal from '../pokemonModal';
import Comparison from '../comparison';
import NavBar from '../navBar';
import InfiniteScroll from 'react-infinite-scroll-component';

const PokemonList = (props) => {
  const fetchPokemonList = () => {
    props.fetchPokemonList(props.pokemonData.next);
  };

  if (!props.pokemonData.didLoadPokemons) {
    fetchPokemonList();
    props.updateLoadPokemon();
  }

  const fetchPokemon = (index) => {
    if (!props.pokemonData.isComparing) {
      props.selectPokemon(index);
      props.fetchPokemon(index);
      props.fetchPokemonSpecies(index);
    } else {
      props.selectPokemon(index);
      props.fetchPokemon(index);
      props.fetchPokemonSpecies(index);
    }
  };

  return (
    <div className="">
      <NavBar isSearchActive={true} />
      <PokemonModal />
      <Comparison />
      {props.pokemonData.isComparing && (
        <div
          className={
            props.pokemonData.isComparing
              ? 'fixed border-solid border-2 rounded-lg border-gray-900 bg-white  right-4 	 '
              : ''
          }
        >
          <h2 className="font-medium text-sm px-4 py-8">
            Comparing:{' '}
            {props.pokemonData.pokemons[
              props.pokemonData.firstPokemon
            ].name.toUpperCase()}
          </h2>
        </div>
      )}
      <InfiniteScroll
        dataLength={props.pokemonData.pokemons.length}
        next={fetchPokemonList}
        hasMore={true}
      >
        <ul className="m-8 mr-16 ml-16 p-0 grid grid-cols-grid-list gap-8 list-none justify-items-stretch">
          {props.pokemonData.pokemons
            .filter((item) => item.name.includes(props.navBar.searchContent))
            .map((pokemon) => {
              const index = props.pokemonData.pokemons.indexOf(pokemon);
              return (
                <li
                  className="items-center max-w-full cursor-pointer shadow-shadow-list hover:bg-hoverpokemon"
                  key={index}
                  onClick={() => fetchPokemon(index)}
                >
                  <img
                    loading="lazy"
                    className="w-48 block m-auto mt-5 mb-5 rendering-pixelated rounded-tl-2xl rounded-tr-2xl"
                    src={utils.SPRITES_URL + (index + 1) + '.png'}
                    alt={pokemon.name}
                  />
                  <h3 className="m-0 p-3 text-center text-xl font-semibold uppercase bg-lightgray text-withe">
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </h3>
                </li>
              );
            })}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoadPokemon: () => dispatch(updateLoadPokemon()),
    selectPokemon: (index) => dispatch(selectPokemon(index)),
    fetchPokemonList: (url) => dispatch(fetchPokemonList(url)),
    fetchPokemon: (index, key) => dispatch(fetchPokemon(index, key)),
    fetchPokemonSpecies: (index, key) =>
      dispatch(fetchPokemonSpecies(index, key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);

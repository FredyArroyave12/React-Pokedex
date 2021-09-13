import React from 'react';
import { connect, RootStateOrAny } from 'react-redux';
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

const PokemonList = (props: {
  fetchPokemonList: (arg0: any) => void;
  pokemonData: {
    next: any;
    didLoadPokemons: any;
    isComparing: any;
    pokemons: any[];
    firstPokemon: string | number;
  };
  updateLoadPokemon: () => void;
  selectPokemon: (arg0: number) => void;
  fetchPokemon: (arg0: number) => void;
  fetchPokemonSpecies: (arg0: number) => void;
  navBar: { searchContent: any };
}) => {
  const fetchPokemonList = () => {
    props.fetchPokemonList(props.pokemonData.next);
  };

  if (!props.pokemonData.didLoadPokemons) {
    fetchPokemonList();
    props.updateLoadPokemon();
  }

  const fetchPokemon = (index: number) => {
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
      <NavBar
        isSearchActive={true}
        updateSearch={undefined}
        changeMobileItemsStatus={undefined}
        navBar={undefined}
      />
      <PokemonModal
        pokemonData={undefined}
        updateComparing={undefined}
        updatePokemonModalActive={undefined}
      />
      <Comparison
        pokemonData={undefined}
        updateComparing={undefined}
        updateComparisonModalActive={undefined}
      />
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
        loader={undefined}
      >
        <ul className="m-8 mr-16 ml-16 p-0 grid grid-cols-grid-list gap-8 list-none justify-items-stretch">
          {props.pokemonData.pokemons.map((pokemon) => {
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
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h3>
              </li>
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => {
  return state;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateLoadPokemon: () => dispatch(updateLoadPokemon()),
    selectPokemon: (index: number) => dispatch(selectPokemon(index)),
    fetchPokemonList: (url: string) => dispatch(fetchPokemonList(url)),
    fetchPokemon: (index: number, key: string | number) =>
      dispatch(fetchPokemon(index)),
    fetchPokemonSpecies: (index: number, key: string | number) =>
      dispatch(fetchPokemonSpecies(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);

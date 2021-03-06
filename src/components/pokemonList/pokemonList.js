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
import './pokemonList.css';

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
    <div className="pokemon-list">
      <NavBar isSearchActive={true} />
      <PokemonModal />
      <Comparison />
      {props.pokemonData.isComparing && (
        <div
          className={
            props.pokemonData.isComparing ? 'comparison-pokemon' : 'hidden'
          }
        >
          <h2 className="comparison-name">
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
        <ul className="pokemon__items">
          {props.pokemonData.pokemons
            .filter((item) => item.name.includes(props.navBar.searchContent))
            .map((pokemon) => {
              const index = props.pokemonData.pokemons.indexOf(pokemon);
              return (
                <li
                  className="pokemon__item"
                  key={index}
                  onClick={() => fetchPokemon(index)}
                >
                  <img
                    loading="lazy"
                    className="pokemon__item-img"
                    src={utils.SPRITES_URL + (index + 1) + '.png'}
                    alt={pokemon.name}
                  />
                  <h3 className="pokemon__item-name">
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

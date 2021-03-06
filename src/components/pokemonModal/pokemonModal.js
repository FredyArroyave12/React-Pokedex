import React from 'react';
import { connect } from 'react-redux';
import {
  updatePokemonModalActive,
  updateComparing,
} from '../../redux/actions/pokemonActions';
import utils from '../../utils';
import pokeballInfo from '../../images/pokeInfo.png';
import Chart from '../statsChart';
import './pokemonModal.css';
import ScrollLock from 'react-scrolllock';

const PokemonModal = (props) => {
  const pokemon = props.pokemonData.pokemons[props.pokemonData.firstPokemon];
  const informationUnits = [' M', ' Kg', ''];
  const informationClass = 'information-container__item-modal';
  const informationClasses = [
    informationClass,
    informationClass,
    informationClass,
  ];

  const closeModal = () => {
    props.updatePokemonModalActive();
  };

  const handleCardClick = (event) => {
    event.stopPropagation();
  };

  const comparePokemon = () => {
    props.updatePokemonModalActive();
    props.updateComparing();
  };

  return (
    <div>
      {props.pokemonData.isModalActive && (
        <ScrollLock>
          <div className="modal-container" onClick={closeModal}>
            <div className="card-modal" onClick={handleCardClick}>
              <div className="pokemon-card__title">
                <button
                  className="pokemon-card__compare"
                  onClick={comparePokemon}
                >
                  Compare To...
                </button>
                <span
                  class="close-icon-modal far fa-times-circle"
                  onClick={closeModal}
                ></span>
              </div>
              <div className="pokemon-container-modal">
                <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>
                <div className="image-container">
                  <img
                    className="pokemon-img"
                    src={utils.SPRITES_URL + pokemon.id + '.png'}
                    alt={pokemon.name}
                  />
                </div>
                <p className="pokemon-description">{pokemon.description}</p>
                <ul className="pokemon-types">
                  {pokemon.types &&
                    pokemon.types.map((type) => (
                      <li
                        className={'pokemon-type ' + type.type.name}
                        key={type.type.name}
                      >
                        {type.type.name.charAt(0).toUpperCase() +
                          type.type.name.slice(1)}
                      </li>
                    ))}
                </ul>
                <div className="information-container-modal">
                  {Object.keys(pokemon.information).map((key, index) => (
                    <div className={informationClasses[index]}>
                      <h3 className="information-container__item-value">
                        {pokemon.information[key] + informationUnits[index]}
                      </h3>
                      <h3 className="information-container__item-name">
                        {key}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pokemon-container">
                <div className="pokemon-container__title">
                  <img
                    className="pokemon-container__title-img"
                    src={pokeballInfo}
                    alt="PokeballInfo"
                  />
                  <h3 className="pokemon-container__title-text">Abilities</h3>
                </div>
                <ul className="abilities-list">
                  {pokemon.abilities &&
                    pokemon.abilities.map((item) => (
                      <li className="abilities-item" key={item.ability.name}>
                        {item.ability.name.charAt(0).toUpperCase() +
                          item.ability.name.slice(1)}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="pokemon-container">
                <div className="pokemon-container__title">
                  <img
                    className="pokemon-container__title-img"
                    src={pokeballInfo}
                    alt="PokeballInfo"
                  />
                  <h3 className="pokemon-container__title-text">Stats</h3>
                </div>
                <Chart className="chart" />
              </div>
            </div>
          </div>
        </ScrollLock>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePokemonModalActive: (state) =>
      dispatch(updatePokemonModalActive(state)),
    updateComparing: (state) => dispatch(updateComparing(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonModal);

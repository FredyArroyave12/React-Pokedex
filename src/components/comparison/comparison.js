import React from 'react';
import { connect } from 'react-redux';
import {
  updateComparisonModalActive,
  updateComparing,
} from '../../redux/actions/pokemonActions';
import utils from '../../utils';
import pokeballInfo from '../../images/pokeInfo.png';
import Chart from '../statsChart';
import './comparison.css';
import ScrollLock from 'react-scrolllock';

const Comparison = (props) => {
  const pokemon = props.pokemonData.pokemons[props.pokemonData.firstPokemon];
  const pokemon2 = props.pokemonData.pokemons[props.pokemonData.secondPokemon];
  const informationUnits = [' M', ' Kg', ''];
  const informationClass = 'information-container__item';
  const informationClasses = [
    informationClass,
    informationClass,
    informationClass,
  ];

  const closeModal = () => {
    props.updateComparing();
    props.updateComparisonModalActive();
  };

  const handleCardClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div>
      {props.pokemonData.isComparisonActive && (
        <ScrollLock>
          <div className="modal-container" onClick={closeModal}>
            <div className="card" onClick={handleCardClick}>
              <div className="pokemon-card__title">
                <span
                  class="close-icon far fa-times-circle"
                  onClick={closeModal}
                ></span>
              </div>
              <div className="pokemon-container">
                <div>
                  <h2 className="pokemon-name">
                    {pokemon.name.toUpperCase()} vs{' '}
                    {pokemon2.name.toUpperCase()}
                  </h2>
                </div>
                <div className="comparison-image-container">
                  <img
                    className="comparison-pokemon-img"
                    src={utils.SPRITES_URL + pokemon.id + '.png'}
                    alt={pokemon.name}
                  />
                  <img
                    className="comparison-pokemon-img"
                    src={utils.SPRITES_URL + pokemon2.id + '.png'}
                    alt={pokemon2.name}
                  />
                </div>
                <div className="information-container">
                  {Object.keys(pokemon.information).map((key, index) => (
                    <div className={informationClasses[index]}>
                      <div className="left-content">
                        <h3 className="information-container__item-value">
                          {pokemon.information[key] + informationUnits[index]}
                        </h3>
                      </div>
                      <div className="center-content">
                        <h3 className="information-container__item-name">
                          {key}
                        </h3>
                      </div>
                      <div className="right-content">
                        <h3 className="information-container__item-value">
                          {pokemon2.information[key] + informationUnits[index]}
                        </h3>
                      </div>
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
                <div className="abilities-container">
                  <ul className="abilities-list">
                    {pokemon.abilities &&
                      pokemon.abilities.map((item) => (
                        <li className="abilities-item" key={item.ability.name}>
                          {item.ability.name.charAt(0).toUpperCase() +
                            item.ability.name.slice(1)}
                        </li>
                      ))}
                  </ul>
                  <ul className="abilities-list-compare">
                    {pokemon2.abilities &&
                      pokemon2.abilities.map((item) => (
                        <li
                          className="abilities-item right"
                          key={item.ability.name}
                        >
                          {item.ability.name.charAt(0).toUpperCase() +
                            item.ability.name.slice(1)}
                        </li>
                      ))}
                  </ul>
                </div>
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
                <Chart className="graph" />
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
    updateComparisonModalActive: (state) =>
      dispatch(updateComparisonModalActive(state)),
    updateComparing: (state) => dispatch(updateComparing(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comparison);

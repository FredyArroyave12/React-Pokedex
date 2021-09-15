import React from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import {
  updatePokemonModalActive,
  updateComparing,
} from '../../redux/actions/pokemonActions';
import utils from '../../utils';
import pokeballInfo from '../../images/pokeInfo.png';
import Chart from '../statsChart';
import ScrollLock from 'react-scrolllock';
interface pokemons {
  name: string;
  url: string;
}

interface pokemonData {
  pokemons: pokemons[];
  firstPokemon: number;
  isModalActive: boolean;
}

const PokemonModal = (props: {
  pokemonData: pokemonData;

  updatePokemonModalActive: () => void;
  updateComparing: () => void;
}) => {
  const pokemon = props.pokemonData.pokemons[props.pokemonData.firstPokemon];
  const informationUnits = [' M', ' Kg', ''];
  const informationClass = 'm-0 pl-2 pr-2';
  const informationClasses = [
    informationClass,
    informationClass,
    informationClass,
  ];

  const closeModal = () => {
    props.updatePokemonModalActive();
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
          <div
            className="fixed top-0 w-screen h-screen m-0 cursor-pointer z-10 overflow-auto bg-shadowbg"
            onClick={closeModal}
          >
            <div
              className=" w-11/12 max-w-2xl m-auto bg-white pb-5 rounded-lg cursor-auto"
              onClick={handleCardClick}
            >
              <div className="flex pt-4">
                <button
                  className="cursor-pointer rounded ml-6 border-solid border border-white text-white px-2 py-1 bg-navbar hover:bg-cardcolor active:bg-cardcolor hover:text-navbar active:text-navbar"
                  onClick={comparePokemon}
                >
                  Compare To...
                </button>
                <span
                  className="block text-2xl ml-auto mr-6 cursor-pointer text-navbar border-navbar far fa-times-circle"
                  onClick={closeModal}
                ></span>
              </div>
              <div className="flex flex-col items-center rounded-lg pb-2 bg-cardcolor mt-6 mx-6">
                <h2 className="text-center mt-8 text-black text-2xl font-bold m-2 uppercase">
                  {pokemon.name.toUpperCase()}
                </h2>
                <div className="rendering-pixelated w-48">
                  <img
                    className="w-full"
                    src={utils.SPRITES_URL + pokemon.id + '.png'}
                    alt={pokemon.name}
                  />
                </div>
                <p className="text-center mx-2 my-10 text-lightblack">
                  {pokemon.description}
                </p>
                <ul className="text-center p-0 uppercase list-none">
                  {pokemon.types &&
                    pokemon.types.map((type: string[]) => (
                      <li
                        className={
                          'inline-block border-solid border-2 border-white rounded mx-4 my-2 text-white px-2 py-2 bg-' +
                          type.type.name
                        }
                        key={type.type.name}
                      >
                        {type.type.name.charAt(0).toUpperCase() +
                          type.type.name.slice(1)}
                      </li>
                    ))}
                </ul>
                <div className="flex w-4/5 text-center mt-4 justify-center pb-2">
                  {Object.keys(pokemon.information).map(
                    (key: string, index: number) => (
                      <div className={informationClasses[index]}>
                        <h3 className="text-base font-medium m-2 text-black">
                          {pokemon.information[key] + informationUnits[index]}
                        </h3>
                        <h3 className="text-base font-medium m-2 text-lightblack">
                          {key}
                        </h3>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center rounded-lg pb-2 bg-cardcolor m-6">
                <div className="mt-2 flex justify-center items-center">
                  <img
                    className="w-8 h-8 mr-2"
                    src={pokeballInfo}
                    alt="PokeballInfo"
                  />
                  <h3 className="text-center mt-0 text-black text-2xl font-bold m-2 uppercase">
                    Abilities
                  </h3>
                </div>
                <ul className="flex p-0 flex-col justify-center text-center list-none m-4">
                  {pokemon.abilities &&
                    pokemon.abilities.map(
                      (item: { ability: { name: React.Key | string } }) => (
                        <li className="m-2" key={item.ability.name}>
                          {item.ability.name.charAt(0).toUpperCase() +
                            item.ability.name.slice(1)}
                        </li>
                      )
                    )}
                </ul>
              </div>
              <div className="flex flex-col items-center rounded-lg pb-2 bg-cardcolor m-6">
                <div className="mt-2 flex justify-center items-center">
                  <img
                    className="w-8 h-8 mr-2"
                    src={pokeballInfo}
                    alt="PokeballInfo"
                  />
                  <h3 className="text-center mt-0 text-black text-2xl font-bold m-2 uppercase">
                    Stats
                  </h3>
                </div>
                <Chart />
              </div>
            </div>
          </div>
        </ScrollLock>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => {
  return state;
};

const mapDispatchToProps = (dispatch: (arg0: { type: string }) => void) => {
  return {
    updatePokemonModalActive: (state: RootStateOrAny) =>
      dispatch(updatePokemonModalActive()),
    updateComparing: (state: RootStateOrAny) => dispatch(updateComparing()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonModal);

import React from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import {
  updateComparisonModalActive,
  updateComparing,
} from '../../redux/actions/pokemonActions';
import utils from '../../utils';
import pokeballInfo from '../../images/pokeInfo.png';
import Chart from '../statsChart';
import ScrollLock from 'react-scrolllock';
import { pokemonData } from '../../interfaces/pokemonData';
interface props {
  pokemonData: pokemonData;
  updateComparing: () => void;
  updateComparisonModalActive: () => void;
}
const Comparison: React.FC<props> = (props): JSX.Element => {
  const pokemon = props.pokemonData.pokemons[props.pokemonData.firstPokemon];
  const pokemon2 = props.pokemonData.pokemons[props.pokemonData.secondPokemon];
  const informationUnits = [' M', ' Kg', ''];
  const informationClass =
    'm-auto -mb-10 -mt-6 relative w-24 pl-2 pr-2 h-1/10  text-center';
  const informationClasses = [
    informationClass,
    informationClass,
    informationClass,
  ];

  const closeModal = () => {
    props.updateComparing();
    props.updateComparisonModalActive();
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div>
      {props.pokemonData.isComparisonActive && (
        <ScrollLock>
          <div
            className="fixed top-0 w-screen h-full m-0 cursor-pointer z-10 bg-shadowbg overflow-auto  "
            onClick={closeModal}
          >
            <div
              className=" w-11/12 max-w-3xl m-auto bg-white rounded-lg cursor-auto pb-5"
              onClick={handleCardClick}
            >
              <div className="flex pt-4">
                <span
                  className="block text-2xl ml-auto mr-6 cursor-pointer text-navbar border-navbar far fa-times-circle"
                  onClick={closeModal}
                ></span>
              </div>
              <div className="flex flex-col items-center rounded-lg pb-2 m-6 bg-cardcolor">
                <div>
                  <h2 className="m-0 mt-4 text-center text-black font-bold text-2xl">
                    {pokemon.name.toUpperCase()} vs{' '}
                    {pokemon2.name.toUpperCase()}
                  </h2>
                </div>
                <div className="w-4/5 flex justify-center rendering-pixelated">
                  <img
                    className=" w-40"
                    src={utils.SPRITES_URL + pokemon.id + '.png'}
                    alt={pokemon.name}
                  />
                  <img
                    className="w-40"
                    src={utils.SPRITES_URL + pokemon2.id + '.png'}
                    alt={pokemon2.name}
                  />
                </div>
                <div className="flex flex-col w-4/5 text-center mt-4 justify-center pb-8">
                  {Object.keys(pokemon.information).map((key, index) => (
                    <div className={informationClasses[index]}>
                      <div className="relative top-6 right-24 m-0">
                        <h3 className="relative top-2 text-base font-medium m-2 text-lightblack">
                          {pokemon.information[key] + informationUnits[index]}
                        </h3>
                      </div>
                      <div>
                        <h3 className="text-base font-medium m-2 uppercase">
                          {key}
                        </h3>
                      </div>
                      <div className="relative bottom-6 left-24">
                        <h3 className="relative bottom-2 text-base font-medium m-2 text-lightblack">
                          {pokemon2.information[key] + informationUnits[index]}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center rounded-lg pb-2 bg-cardcolor m-6">
                <div className="mt-2 flex justify-center items-center">
                  <img
                    className="w-8 h-8 mr-2"
                    src={pokeballInfo}
                    alt="PokeballInfo"
                  />
                  <h3 className="m-0 text-lightblack font-bold text-2xl">
                    Abilities
                  </h3>
                </div>
                <div className="mt-4 flex">
                  <ul className="flex p-0 flex-col justify-center text-center m-4 list-none">
                    {pokemon.abilities &&
                      pokemon.abilities.map(
                        (item: {
                          ability: {
                            name: React.Key | string;
                          };
                        }) => (
                          <li
                            className="uppercase text-center"
                            key={item.ability.name}
                          >
                            {item.ability.name.charAt(0).toUpperCase() +
                              item.ability.name.slice(1)}
                          </li>
                        )
                      )}
                  </ul>
                  <ul className="flex flex-col justify-center text-center m-4 list-none">
                    {pokemon2.abilities &&
                      pokemon2.abilities.map(
                        (item: { ability: { name: React.Key | string } }) => (
                          <li
                            className="uppercase text-center right"
                            key={item.ability.name}
                          >
                            {item.ability.name.charAt(0).toUpperCase() +
                              item.ability.name.slice(1)}
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center rounded-lg pb-2 bg-cardcolor m-6">
                <div className="mt-2 flex justify-center items-center">
                  <img
                    className="w-8 h-8 mr-2"
                    src={pokeballInfo}
                    alt="PokeballInfo"
                  />
                  <h3 className="m-0 text-lightblack font-bold text-2xl">
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

const mapDispatchToProps = (dispatch: RootStateOrAny) => {
  return {
    updateComparisonModalActive: () => dispatch(updateComparisonModalActive()),
    updateComparing: () => dispatch(updateComparing()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comparison);

import utils from '../../utils';
import store from '../store';

export const actionTypes = {
  POKEMON_LIST_REQUEST: 'POKEMON_LIST_REQUEST',
  POKEMON_LIST_SUCCESS: 'POKEMON_LIST_SUCCESS',
  POKEMON_LIST_ERROR: 'POKEMON_LIST_ERROR',
  POKEMON_REQUEST: 'POKEMON_REQUEST',
  POKEMON_SUCCESS: 'POKEMON_SUCCESS',
  POKEMON_ERROR: 'POKEMON_ERROR',
  POKEMON_SPECIES_REQUEST: 'POKEMON_SPECIES_REQUEST',
  POKEMON_SPECIES_SUCCESS: 'POKEMON_SPECIES_SUCCESS',
  SPECIES_ERROR: 'SPECIES_ERROR',
  MODAL_ACTIVE: 'MODAL_ACTIVE',
  SELECT_POKEMON: 'SELECT_POKEMON',
  UPDATE_LOAD_POKEMON: 'UPDATE_LOAD_POKEMON',
  UPDATE_COMPARING: 'UPDATE_COMPARING',
  COMPARISON_MODAL_ACTIVE: 'COMPARISON_MODAL_ACTIVE',
};

export const fetchPokemonList =
  (url = utils.API_URL + '/pokemon') =>
  (dispatch: any) => {
    dispatch({
      type: actionTypes.POKEMON_LIST_REQUEST,
    });

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: actionTypes.POKEMON_LIST_SUCCESS,
          payload: {
            count: data.count,
            next: data.next,
            previous: data.previous,
            pokemons: data.results,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.POKEMON_LIST_ERROR,
          payload: {
            error: error,
          },
        });
      });
  };

export const fetchPokemon = (index: any) => (dispatch: any) => {
  const url = utils.API_URL + '/pokemon/' + (index + 1);
  const state = store.getState();
  const pokemon = state.pokemonData.pokemons[index];

  if (pokemon.dataLoaded && pokemon.speciesLoaded) {
    dispatch({
      type: actionTypes.POKEMON_SUCCESS,
      payload: {
        index,
        pokemon,
      },
    });
  } else {
    dispatch({
      type: actionTypes.POKEMON_REQUEST,
    });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: actionTypes.POKEMON_SUCCESS,
          payload: {
            index,
            pokemon: {
              id: data.id,
              name: data.name,
              information: {
                height: data.height / 10,
                weight: data.weight / 10,
              },
              abilities: data.abilities,
              stats: data.stats,
              types: data.types,
              url,
            },
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.POKEMON_ERROR,
          payload: {
            error: error,
          },
        });
      });
  }
};

export const fetchPokemonSpecies = (index: number) => (dispatch: any) => {
  const url = utils.API_URL + '/pokemon-species/' + (index + 1);
  const state = store.getState();
  const pokemon = state.pokemonData.pokemons[index];

  if (pokemon.dataLoaded && pokemon.speciesLoaded) {
    dispatch({
      type: actionTypes.POKEMON_SPECIES_SUCCESS,
      payload: {
        index,
        description: pokemon.description,
        gender: pokemon.information.gender,
      },
    });
  } else {
    dispatch({
      type: actionTypes.POKEMON_SPECIES_REQUEST,
    });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: actionTypes.POKEMON_SPECIES_SUCCESS,
          payload: {
            index,
            description: data.flavor_text_entries[1].flavor_text,
            gender: getStringGender(data.gender_rate),
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.SPECIES_ERROR,
          payload: {
            error: error,
          },
        });
      });
  }
};

export const selectPokemon = (index: any) => {
  const state = store.getState();
  const key = !state.pokemonData.isComparing ? 'firstPokemon' : 'secondPokemon';

  return {
    type: actionTypes.SELECT_POKEMON,
    payload: {
      [key]: index,
    },
  };
};

export const updatePokemonModalActive = () => ({
  type: actionTypes.MODAL_ACTIVE,
});

export const updateComparing = () => ({
  type: actionTypes.UPDATE_COMPARING,
});

export const updateLoadPokemon = () => ({
  type: actionTypes.UPDATE_LOAD_POKEMON,
});

export const updateComparisonModalActive = () => ({
  type: actionTypes.COMPARISON_MODAL_ACTIVE,
});

const getStringGender = (index: any) => {
  if (index >= 0 && index <= 4) {
    return 'Male';
  } else if (index >= 4 && index <= 8) {
    return 'Female';
  } else if (index === -1) {
    return 'Genderless';
  } else {
    return 'Unknown';
  }
};

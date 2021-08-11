import { actionTypes } from '../actions/pokemonActions';

import utils from '../../utils';

const initialState = {
  count: 0,
  next: utils.API_URL + '/pokemon',
  previous: '',
  pokemons: [],
  isFetching: false,
  isFetchingPokemon: false,
  secondPokemon: 0,
  isModalActive: false,
  isComparing: false,
  isComparisonActive: false,
  didLoadPokemons: false,
  error: null,
  searchPokemon: [],
  searchContent: '',
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SEARCH:
      return {
        ...state,
        searchContent: action.payload.searchContent,
        isFetching: true,
        isFetchingPokemon: true,
        pokemons: action.payload.searchPokemons.filter((item) =>
          item.name
            .toLowerCase()
            .includes(state.searchContent.toLocaleLowerCase())
        ),
      };

    case actionTypes.POKEMON_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.POKEMON_LIST_SUCCESS:
      return {
        ...state,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        pokemons: [...state.pokemons, ...action.payload.pokemons],
        searchPokemon: [...state.pokemons, ...action.payload.pokemons],
        isFetching: false,
      };
    case actionTypes.POKEMON_LIST_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false,
      };

    case actionTypes.POKEMON_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.POKEMON_SUCCESS:
      state.pokemons[action.payload.index] = {
        ...action.payload.pokemon,
        dataLoaded: true,
      };

      return {
        ...state,
        isFetchingPokemon: false,
        isModalActive:
          !state.isComparing &&
          state.pokemons[action.payload.index].dataLoaded &&
          state.pokemons[action.payload.index].speciesLoaded,
        isComparisonActive:
          state.isComparing &&
          state.pokemons[action.payload.index].dataLoaded &&
          state.pokemons[action.payload.index].speciesLoaded,
      };

    case actionTypes.POKEMON_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isFetchingPokemon: false,
      };
    case actionTypes.POKEMON_SPECIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.POKEMON_SPECIES_SUCCESS:
      state.pokemons[action.payload.index] = {
        ...state.pokemons[action.payload.index],
        information: {
          ...state.pokemons[action.payload.index].information,
          gender: action.payload.gender,
        },
        description: action.payload.description,
        speciesLoaded: true,
      };
      return {
        ...state,
        isFetchingPokemon: false,
        isModalActive:
          !state.isComparing &&
          state.pokemons[action.payload.index].dataLoaded &&
          state.pokemons[action.payload.index].speciesLoaded,
        isComparisonActive:
          state.isComparing &&
          state.pokemons[action.payload.index].dataLoaded &&
          state.pokemons[action.payload.index].speciesLoaded,
      };
    case actionTypes.SPECIES_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isFetchingPokemon: false,
      };
    case actionTypes.SELECT_POKEMON:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.MODAL_ACTIVE:
      return {
        ...state,
        isModalActive: !state.isModalActive,
      };
    case actionTypes.UPDATE_COMPARING:
      return {
        ...state,
        isComparing: !state.isComparing,
      };

    case actionTypes.COMPARISON_MODAL_ACTIVE:
      return {
        ...state,
        isComparisonActive: !state.isComparisonActive,
      };

    case actionTypes.UPDATE_LOAD_POKEMON:
      return {
        ...state,
        didLoadPokemons: !state.didLoadPokemons,
      };
    default:
      return state;
  }
};

export default pokemonReducer;

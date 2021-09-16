import { pokemons } from '../interfaces/pokemons';
import { pokemon } from '../interfaces/pokemon';

export interface pokemonData {
  isComparisonActive?: JSX.Element;
  secondPokemon: number;
  isComparing: boolean;
  didLoadPokemons?: boolean;
  isModalActive?: JSX.Element;
  firstPokemon: number;
  count: number;
  next: string;
  previous: boolean;
  pokemons: pokemons[];
  error: null;
  index: number;
  pokemon: pokemon[];
  gender: string;
  description: string;
}

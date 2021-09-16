export interface pokemon {
  id: number;
  name: string;
  information: { height: number; weight: number };
  abilities: string;
  stats: string | number;
  types: string;
  url: string;
}

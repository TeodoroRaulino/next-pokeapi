type PokemonProps = {
  id: number;
  name: string;
  url: string;
};

type PokemonDetailProps = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
};

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type { PokemonProps, PokemonDetailProps };

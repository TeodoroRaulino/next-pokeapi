import { PokemonProps } from "@/types/pokemon";
import Image from "next/image";
import { useModalStore } from "@/store/modal";

type Props = {
  pokemon: PokemonProps;
};

export default function Pokemon({ pokemon }: Props) {
  const { openAndSetId } = useModalStore();
  return (
    <div className="p-5 flex flex-col items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Image
        className="rounded-t-lg py-2"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        width="120"
        height="120"
        alt={pokemon.name}
      />
      <div className="p-2 flex flex-col items-center">
        <h1 className="text-center text-white font-bold text-2xl bg-red-700 px-1.5 py-1 rounded-md">
          #{pokemon.id}
        </h1>
        <h5 className="py-3 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pokemon.name}
        </h5>
      </div>
      <button
        type="button"
        onClick={() => openAndSetId(pokemon.id)}
        className="rounded-full bg-white text-red-700 text-2xl font-bold py-1.5 px-4 hover:bg-red-700 hover:text-white"
      >
        Detalhes
      </button>
    </div>
  );
}

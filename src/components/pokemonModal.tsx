import { useModalStore } from "@/store/modal";
import { PokemonProps, PokemonDetailProps } from "@/types/pokemon";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";

export default function PokemonModal() {
  const { id, isOpen, close } = useModalStore();

  const [data, setData] = useState<PokemonDetailProps | null>(null);

  useEffect(() => {
    async function getPokemon() {
      if (!!id) {
        console.log("id: ", id);

        const response = await axios.get(API_URL + id);
        setData(response.data);
      } else {
        setData(null);
      }
    }

    getPokemon();
  }, [id, API_URL]);

  return (
    <>
      <div
        className={`fixed z-50 w-full h-full flex justify-center md:pt-10 ${
          !isOpen && "hidden"
        }`}
      >
        <div className="flex items-end justify-center min-h-screen md:w-2/5 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            onClick={() => close()}
            className="fixed inset-0 transition-opacity"
          ></div>
          <div className="relative w-full h-full max-w-2xl md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {data?.name}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => close()}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6 flex flex-col items-center">
                <>
                  <Image
                    className="rounded-t-lg py-2"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`}
                    width="120"
                    height="120"
                    alt={"pokemon: " + data?.name}
                  />
                  <div>
                    <h2 className="leading-relaxed text-xl text-gray-500 dark:text-red-700 font-bold">
                      Número:
                    </h2>
                    <h2 className="text-center text-base leading-relaxed text-gray-500 dark:text-white">
                      #{data?.id}
                    </h2>
                  </div>
                  <div>
                    <h2 className="text-center text-xl leading-relaxed text-gray-500 dark:text-red-700 font-bold">
                      Tipo:
                    </h2>
                    <div>
                      {data?.types.map((pokemon: any, _: any) => (
                        <h2
                          key={pokemon.type.name}
                          className="text-center text-base leading-relaxed text-gray-500 dark:text-white"
                        >
                          {pokemon.type.name}
                        </h2>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col text-center mr-10">
                      <h2 className="leading-relaxed text-xl text-gray-500 dark:text-red-700 font-bold">
                        Altura
                      </h2>
                      <h3 className="text-base leading-relaxed text-gray-500 dark:text-white">
                        {data?.height}
                      </h3>
                    </div>
                    <div className="flex flex-col text-center">
                      <h2 className="leading-relaxed text-xl text-gray-500 dark:text-red-700 font-bold">
                        Peso
                      </h2>
                      <h3 className="text-base leading-relaxed text-gray-500 dark:text-white">
                        {data?.weight}
                      </h3>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

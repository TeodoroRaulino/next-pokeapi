import Image from "next/image";
import PokemonProps from "../types/pokemon";
import { useEffect, useState, FormEvent } from "react";
import api from "../utils/api";
import Pokemon from "@/components/pokemon";
import Pagination, { paginate } from "@/components/pagination";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState<PokemonProps[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const pageSize = 12;
  const pokemonsPage = paginate(pokemons, currentPage, pageSize);
  const pokemonFilter = paginate(data, currentPage, pageSize);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filterPokemons = (search: string) => {
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    filteredPokemons.map((item, _) => {
      item.id = parseInt(item.url.slice(34).replace("/", ""));
    });

    setData(filteredPokemons);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    filterPokemons(search);
  };

  useEffect(() => {
    async function getPokemons() {
      const firstGeneration = 151;

      const response = await api
        .get(`?limit=${firstGeneration}`)
        .finally(() => setLoading(false));
      const data = response.data.results;

      setPokemons(data);
    }

    getPokemons();
  }, []);

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Digite o usuário que deseja encontrar..."
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Pesquisar
          </button>
        </div>
      </form>

      <div className="flex justify-center py-10">
        <h1 className="text-3xl font-bold">Pokédex</h1>
        <img src="/pokeball.png" className="h-12 px-2"></img>
      </div>

      <div className="grid grid-cols-4 gap-5 px-3">
        {data.length > 0
          ? pokemonFilter.map((pokemon: PokemonProps) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))
          : pokemonsPage.map((pokemon: PokemonProps) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))}
      </div>

      <Pagination
        pokemons={data.length > 0 ? data.length : pokemons.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}

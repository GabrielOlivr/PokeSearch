"use client";
import React, { useState, useEffect } from "react";
import { MdCatchingPokemon } from "react-icons/md";
import SearchBar from "./search-bar";
import PokemonCard from "./pokemon-card";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

const HomePage = () => {
  const [pokemon, setPokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State for selected Pokémon
  const { gitHubSignIn, user, firebaseSignOut } = useUserAuth();
  const [userName, setUserName] = useState("");

  const fetchPokemon = async (query) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      const data = await response.json();

      setPokemon({
        name: data.name,
        sprite: data.sprites.front_default,
        type: data.types.map((type) => type.type.name).join(", "),
        species: data.species.name,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((ability) => ability.ability.name).join(", "),     
      });
    } catch {
      setPokemon(null);
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.displayName || user.email);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePokemonClick = () => {
    setSelectedPokemon(pokemon); 
  };

  return (
    <main className="bg-[url('/img/pk.png')] bg-cover bg-center bg-no-repeat min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold font-mono flex items-center space-x-4"><MdCatchingPokemon size={"2em"}/>Pokémon Search</h1>
          <div className="flex items-center space-x-4">
            {user && <p className="text-sm text-white font-mono">Logged in as: {userName}</p>}
            {user && (
              <Link
                href="cards"
                className="bg-violet-600 text-white px-4 py-2 rounded font-mono hover:bg-violet-400"
              >
                Cards
              </Link>
            )}
            {!user ? (
              <button
                onClick={handleLogin}
                className="bg-violet-600 text-white px-4 py-2 rounded font-mono hover:bg-violet-400"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogOut}
                className="bg-violet-600 text-white px-4 py-2 rounded font-mono hover:bg-violet-400"
              >
                Logout
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <SearchBar onSearch={fetchPokemon} />
          {pokemon && (
            <div onClick={handlePokemonClick} className="bg-violet-600 hover:bg-violet-400 cursor-pointer">
              <PokemonCard pokemon={pokemon} />
            </div>
          )}
        </div>
        {selectedPokemon && (
        <div className="flex justify-center items-center mt-8">
          <div className="bg-white/75 text-black p-4 rounded shadow-lg w-full max-w-md">
            <h2 className="flex justify-center items-center text-xl font-bold font-mono mb-4">
              {selectedPokemon.name.toUpperCase()}
            </h2>
            <img
              src={selectedPokemon.sprite}
              alt={selectedPokemon.name}
              className="mx-auto mb-2"
            />
            <p>
              <strong className="font-mono text-lg">Type:</strong> {selectedPokemon.type}
            </p>
            <p>
              <strong className="font-mono text-lg">Species:</strong> {selectedPokemon.species}
            </p>
            <p>
              <strong className="font-mono text-lg">Height:</strong> {selectedPokemon.height} 
            </p>
            <p>
              <strong className="font-mono text-lg">Weight:</strong> {selectedPokemon.weight} 
            </p>
            <p>
              <strong className="font-mono text-lg">Abilities:</strong> {selectedPokemon.abilities}
            </p>
          </div>
        </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;

"use client";
import React from "react";

export default function PokemonCard({ pokemon }){
  if (!pokemon) return <p className="text-gray-500 font-mono">No Pokémon found.</p>;

  return (
    <div className="border border-gray-300 bg-white/70 text-black rounded-lg p-4 w-64 text-center">
      <h2 className="text-xl font-bold capitalize font-mono">{pokemon.name}</h2>
    </div>
  );
};



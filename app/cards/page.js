"use client";
import React, { useState } from "react";

export default function CardsPage(){
  const [collection, setCollection] = useState([]);

  const drawCard = async () => {
    const id = Math.floor(Math.random() * 898) + 1;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setCollection([...collection, data]);
    } catch (error) {
      console.error("Failed to fetch Pokémon", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Pokémon Collection</h1>
      <button
        onClick={drawCard}
        className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-400 mb-4"
      >
        Draw Pokémon Card
      </button>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {collection.length === 0 ? (
          <p className="text-gray-700">You have no Pokémon cards yet.</p>
        ) : (
          collection.map((pokemon, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 text-center"
            >
              <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};


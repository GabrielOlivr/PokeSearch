import React, { useState } from "react";
import { dbAddItem } from "../_services/cards-service";

const Collection = () => {
  const [collection, setCollection] = useState([]);

  const drawCard = async () => {
    const id = Math.floor(Math.random() * 898) + 1; 
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setCollection([...collection, data]);
    } catch (error) {
      console.error("Failed to fetch Pokémon data", error);
    }
  };

  const [cards, setCards] = useState([]);
  const handleAddItem = async (newCard) => {
    if (user){
        const cardId = await dbAddItem(user.uid, newCard);
        setCards((prevCards) => [...prevCards, {id: cardId, ...newCard}]);
    }
  };

  return (
    <div>
      <button
        onAddItem={handleAddItem}
        onClick={drawCard}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Draw Pokémon Card
      </button>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {collection.map((pokemon, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default Collection;

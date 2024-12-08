"use client";
import React, { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import db from "../_utils/firestore";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";


export default function CardsPage() {
  const [collectionData, setCollectionData] = useState([]);
  const { user } = useUserAuth(); 

  // Fetch user's Pokémon cards from Firestore
  useEffect(() => {
    const fetchUserCards = async () => {
      if (user) {
        try {
          const userCardsQuery = query(
            collection(db, "pokemon_inventory"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(userCardsQuery);
          const cards = querySnapshot.docs.map((doc) => doc.data());
          setCollectionData(cards);
        } catch (error) {
          console.error("Error fetching user cards:", error);
        }
      }
    };

    fetchUserCards();
  }, [user]);

  // Draw a random card and save it in Firestore
  const drawCard = async () => {
    const id = Math.floor(Math.random() * 898) + 1;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      const card = {
        name: data.name,
        sprite: data.sprites.front_default,
        userId: user.uid,
      };

      // Save to Firestore
      await addDoc(collection(db, "pokemon_inventory"), card);

      // Update local state
      setCollectionData([...collectionData, card]);
    } catch (error) {
      console.error("Failed to fetch or save Pokémon:", error);
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
        {collectionData.length === 0 ? (
          <p className="text-gray-700">You have no Pokémon cards yet.</p>
        ) : (
          collectionData.map((pokemon, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 text-center"
            >
              <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="mx-auto"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

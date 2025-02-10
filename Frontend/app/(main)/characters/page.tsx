"use client";
import { useState, useEffect } from "react";
import { Character } from "../../../types";
import { useAuth } from "../../../components/Auth/context/AuthContext";
import CharacterCard from "../../../components/GameComponents/Characters/CharacterCard";
import CreateCharacterButton from "../../../components/GameComponents/Characters/CreateCharacterButton";
import Pagination from "../../../components/GameComponents/Characters/Pagination";

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { getUserId } = useAuth();

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const fetchCharacters = async (pageNumber: number) => {
    const userId = await getUserId();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/characters/${userId}/characters?page=${pageNumber}`
    );
    const data = await response.json();
    setCharacters(data.characters || []); // Solo se reciben 3 personajes por página
    setTotalPages(data.totalPages || 1);
  };

  return (
    <div className="container mx-auto p-4 ">
      <h2 className="text-2xl font-semibold mb-4">Characters</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.length > 0 ? (
          characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        ) : (
          <p>No characters found.</p>
        )}
      </div>

      <div className="mt-4">
        <CreateCharacterButton />
      </div>

      <div className="mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
};

export default CharacterList;

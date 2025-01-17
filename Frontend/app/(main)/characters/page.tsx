'use client';
import { useState, useEffect } from "react";
import { Character } from "../../../types";
import ProtectedRoute from "../../../components/auth/ProtectedRoute";
import { useAuth } from '../../../components/auth/context/AuthContext';

const CharacterList = () => {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { getUserId } = useAuth();

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const fetchCharacters = async (pageNumber: number) => {

    const userid = await getUserId();
    console.log(userid);
    const response = await fetch(`http://localhost:4001/api/characters/${userid}/characters?page=${pageNumber}`); /* fix note: tengo que agregar los authprotect a la ruta */
    const data = await response.json();
    setCharacters(data.characters || []);
    setTotalPages(data.totalPages || 1);
  };

  return (

<>
      <h2 className="text-2xl font-semibold mb-4">Characters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div key={character.id} className="border border-gray-300 bg-white p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{character.name}</h3>
                <span className="text-gray-500">Character-ID#{character.id}</span>
              </div>
              <img src={`/characters/${character.id}.gif`} alt="asdas" className="w-36 h-38 mx-auto mb-4" />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Base Level:</span> {character.baseLevel}
                </div>
                <div>
                  <span className="font-medium">Job Level:</span> {character.jobLevel}
                </div>
                <div>
                  <span className="font-medium">HP:</span> {character.health}
                </div>
                <div>
                  <span className="font-medium">Mana:</span> {character.mana}
                  </div>
                <div>
                  <span className="font-medium">Attack Power:</span> {character.attackPower}
                </div>
                <div>
                  <span className="font-medium">Defense:</span> {character.defense}
                </div>
                <div>
                  <span className="font-medium">Magic Defense:</span> {character.magicDefense}
                  </div>
                <div>
                    <span className="font-medium">STR:</span> {character.str}
                </div>
                <div>
                    <span className="font-medium">AGI:</span> {character.agi}
                </div>
                <div>
                    <span className="font-medium">VIT:</span> {character.vit}
                </div>
                <div>
                    <span className="font-medium">INT:</span> {character.int}
                </div>
                <div>
                    <span className="font-medium">DEX:</span> {character.dex}
                </div>
                <div>
                    <span className="font-medium">LUK:</span> {character.luk}
                </div>
                <div>
                    <span className="font-medium">Job Class:</span> {character.jobclassId}

                </div>
                <div>
                    <span className="font-medium">User ID:</span> {character.userId}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No characters found.</p>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      </>

  );
};

export default CharacterList;

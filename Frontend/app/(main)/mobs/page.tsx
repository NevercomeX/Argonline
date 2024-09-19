'use client';

import { useState, useEffect} from "react";
import { Monster } from "../../../types";

const MonsterList: React.FC = () => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchMonsters(page);
  }, [page]);

  const fetchMonsters = async (pageNumber: number) => {
    const response = await fetch(`http://localhost:4001/api/mobs?page=${pageNumber}`);
    const data = await response.json();
    setMonsters(data.monsters);
    setTotalPages(data.totalPages);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Monsters</h2>
      
      {/* Cuadros de monstruos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {monsters.map(monster => (
          <div key={monster.id} className="border border-gray-300 bg-white p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{monster.name}</h3>
              <span className="text-gray-500">Mob-ID#{monster.id}</span>
            </div>
            <img src={`/mobs/${monster.mobIcon}`} alt={monster.name} className="w-12 h-12 mx-auto mb-4" />
            <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
                    <span className="font-medium">HP:</span> {monster.health}
                  </div>
                  <div>
                    <span className="font-medium">attackPower:</span> {monster.attackPower}
                  </div>
                  <div>
                    <span className="font-medium">maxHealth:</span> {monster.maxHealth}
                  </div>
                  <div>
                    <span className="font-medium">magicPower:</span> {monster.magicPower}
                  </div>
                  <div>
                    <span className="font-medium">defense:</span> {monster.defense}
                  </div>
                  <div>
                    <span className="font-medium">Defensa Magica:</span> {monster.magicDefense}
                  </div>
                  <div>
                    <span className="font-medium">Exp:</span> {monster.giveBaseExpAmount}
                  </div>
                  <div>
                    <span className="font-medium">Job Exp:</span> {monster.giveJobExpAmount}
                  </div>
                  <div>
                    <span className="font-medium">Level:</span> {monster.baseLevel}
                  </div>
                  <div>
                    <span className="font-medium">Race:</span> {monster.monsterType}
                  </div>
            </div>
          </div>
        ))}
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

export default MonsterList;


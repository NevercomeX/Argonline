import { jobSprites } from '../jobs/jobSpritesMap'; // Importa el mapa o función de las rutas
import { jobGenderSprites } from '../jobs/jobSpritesMap';
import { Character } from '../../types/character';

const CharacterCard = ({ character }: { character: Character }) => {
  const spritePath = jobSprites[character.jobclassId] || '/default/path.gif'; // Obtén la ruta del sprite
  const spriteGender = jobGenderSprites[character.jobclassId] || '/default/path.gif'; // Obtén la ruta del sprite
  const gender = character.gender;

  return (
    <>
    <div className="border border-gray-300 bg-white p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{character.name}</h3>
        <span className="text-gray-500">Character-ID# {character.id}</span>
      </div>
      
      {/* Contenedor para la imagen */}
      <div className="flex flex-col items-center">
        <img
          src={`${spriteGender}_${gender}.gif`} // Usa la ruta obtenida del mapa
          alt={character.name}
          className="mx-auto mb-4"
          style={{ width: 100, height: 100, objectFit: 'contain' }} // Tamaño fijo
        />

        {/* Barras de estado */}
        <div className="w-full space-y-2">
          {/* Barra de vida */}
          <div className=''>
          <div>
            <label className="text-sm font-medium text-gray-700">HP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full"
                style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.health}/{character.maxHealth}
            </p>
          </div>

          {/* Barra de maná */}
          <div>
            <label className="text-sm font-medium text-gray-700">MP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${(character.mana / character.maxMana) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.mana}/{character.maxMana}
            </p>
          </div>
          </div>

          {/* Barra de experiencia base */}
          <div>
          <div>
            <label className="text-sm font-medium text-gray-700">Base EXP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${(character.baseExp / character.maxBaseExp) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.baseExp}/{character.maxBaseExp}
            </p>
          </div>

          {/* Barra de experiencia de job */}
          <div>
            <label className="text-sm font-medium text-gray-700">Job EXP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-yellow-500 h-4 rounded-full"
                style={{ width: `${(character.jobExp / character.maxJobExp) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.jobExp}/{character.maxJobExp}
            </p>
          </div>
        </div>
      </div>

      {/* Botones siempre alineados */}

      </div>
      
    </div>
          {/* <div className="grid grid-cols-2 gap-2 text-sm pt-4">
        <button className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
          Show More Stats
        </button>
        <button className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
          Show Equipment
        </button>
        <button className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
          Show Inventory
        </button>
        <button className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
          Show Delete
        </button>
      </div> */}
    </>
  );
};

export default CharacterCard;

import Image from "next/image";
import { jobSprites } from "../Jobs/JobSpritesMap"; // Rutas de sprites para trabajos
import { jobGenderSprites } from "../Jobs/JobSpritesMap";
import { useRouter } from "next/navigation";
import { Character } from "@/types/Character";
import { getStatsCharacter } from "@/utils/gameUtils/statsApi";

// Obtener estadísticas de combate de un personaje
const getStats = (characterId: number) => {
  const stats = getStatsCharacter(characterId);
  return stats;
};

const CharacterCard = ({ character }: { character: Character }) => {
  // Obtener la ruta base del sprite según el jobclass; se asume que jobSprites y jobGenderSprites son objetos
  const spritePath = jobSprites[character.jobclass] || "/default/path.gif";
  const spriteGender =
    jobGenderSprites[character.jobclass] || "/default/path.gif";
  const gender = character.gender;

  const router = useRouter();

  const handleClick = () => {
    router.push(`/characters/${character.id}`);
  };

  const stats = getStats(character.id);

  // Convertir BigInt a number para los cálculos
  const baseExpPercent =
    (Number(character.baseExp) / Number(character.maxBaseExp)) * 100;
  const jobExpPercent =
    (Number(character.jobExp) / Number(character.maxJobExp)) * 100;
  const hpPercent = (character.health / character.maxHealth) * 100;
  const mpPercent = (character.mana / character.maxMana) * 100;

  return (
    <div className="border border-gray-300 bg-white p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-100 dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{character.name}</h3>
      </div>

      <div
        onClick={handleClick}
        className="flex flex-col items-center cursor-pointer"
      >
        <Image
          src={`${spriteGender}_${gender}.gif`}
          alt={character.name}
          width={100}
          height={100}
          className="mx-auto mb-4 object-contain"
        />

        {/* Barras de estado */}
        <div className="w-full space-y-2">
          {/* Barra de vida */}
          <div>
            <label className="text-sm font-medium text-gray-700">HP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full"
                style={{ width: `${hpPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.HP}/{stats.MAXHP}
            </p>
          </div>

          {/* Barra de maná */}
          <div>
            <label className="text-sm font-medium text-gray-700">MP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${mpPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.mana}/{character.maxMana}
            </p>
          </div>

          {/* Barra de experiencia base */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Base EXP
            </label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${baseExpPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.baseExp}/{Number(character.maxBaseExp)}
            </p>
          </div>

          {/* Barra de experiencia de job */}
          <div>
            <label className="text-sm font-medium text-gray-700">Job EXP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-yellow-500 h-4 rounded-full"
                style={{ width: `${jobExpPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.jobExp}/{character.maxJobExp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

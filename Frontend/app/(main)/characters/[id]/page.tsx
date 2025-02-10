// src/app/characters/[id]/page.tsx
import { Character } from "@/types";
import { jobGenderSprites } from "@/components/GameComponents/Jobs/JobSpritesMap";
import CharacterEquipmentInventory from "@/components/GameComponents/Characters/Details/CharacterEquipmentInventory";
import CharacterInfo from "@/components/GameComponents/Characters/Details/CharacterInfo";
import CombatStats from "@/components/GameComponents/Characters/Details/CombatStats";
import HealthManaBars from "@/components/GameComponents/Characters/Details/HealthManaBars";
import ExperienceInfo from "@/components/GameComponents/Characters/Details/ExperienceInfo";
import RadarChartSection from "@/components/GameComponents/Characters/Details/RadarChartSection";

// Importamos las utilidades centralizadas
import { getCharacterById } from "@/utils/gameUtils/characterApi";
import { getEquipmentMenu } from "@/utils/gameUtils/equipmentApi";
import { getInventory } from "@/utils/gameUtils/inventoryApi";

interface CharacterDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function CharacterDetailsPage({
  params,
}: CharacterDetailsPageProps) {
  const { id } = params;
  const characterId = Number(id);

  // Obtener los detalles del personaje usando la utilidad
  const character: Character = await getCharacterById(characterId);

  // Obtener el menú de equipamiento y el inventario
  const equipmentMenu = await getEquipmentMenu(character.id);
  const inventoryData = await getInventory(character.id);

  // Convertir equipmentMenu (objeto) a un array de EquipmentItem para el componente
  const equipmentSlots = Object.keys(equipmentMenu).map((slotName) => {
    const slotData = equipmentMenu[slotName];
    return {
      slot: slotName,
      item:
        slotData && slotData.item
          ? {
              id: slotData.item.id,
              name: slotData.item.name,
              sprite: slotData.item.sprite,
            }
          : null,
    };
  });

  // Convertir inventoryData a la estructura que espera el componente,
  // conservando itemId y instanceId (si existe)
  const inventoryItems = (inventoryData || []).map((item: any) => {
    const itemTemplate = item.itemInstance?.item || item.item;
    return {
      itemId: item.itemId,
      instanceId: item.itemInstance ? item.itemInstance.id : null,
      name: itemTemplate?.name || "Unknown Item",
      quantity: item.quantity,
      sprite: itemTemplate?.sprite || "",
      equipable: itemTemplate?.isStackable === false,
      equipmentSlot: itemTemplate?.equipSlots?.[0] || "Unknown Slot",
      isInstance: !!item.itemInstanceId,
    };
  });

  // Actualizar la ruta del sprite del personaje usando jobGenderSprites
  const jobSpritePath =
    jobGenderSprites[character.jobclass] || "/default/path.gif";
  const characterSprite = `${jobSpritePath}_${character.gender || "male"}.gif`;

  // Radar chart data basado en los atributos del personaje
  const radarData = {
    labels: ["str", "agi", "vit", "int", "dex", "luk"],
    datasets: [
      {
        label: "Character Stats",
        data: [
          character.str || 0,
          character.agi || 0,
          character.vit || 0,
          character.int || 0,
          character.dex || 0,
          character.luk || 0,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        max: 300,
        min: 0,
        angleLines: { color: "#ccc" },
        grid: { color: "#ddd" },
        ticks: { display: true, color: "#333" },
        pointLabels: {
          color: "#333",
          font: { size: 13 },
        },
      },
    },
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="border border-gray-300 bg-white p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-100">
      <CharacterEquipmentInventory
        characterId={character.id}
        characterName={character.name}
        characterSprite={characterSprite}
        initialEquipmentSlots={equipmentSlots}
        initialInventoryItems={inventoryItems}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <CharacterInfo
          baseLevel={character.baseLevel}
          jobLevel={character.jobLevel}
          gender={character.gender}
        />
        <CombatStats
          attackPower={character.str * 100 * 0.7}
          defense={character.vit * 10}
          magicPower={character.int * 100 * 0.7}
          magicDefense={character.int * 10}
        />
        <HealthManaBars
          health={character.health}
          maxHealth={character.maxHealth}
          mana={character.mana}
          maxMana={character.maxMana}
        />
        <ExperienceInfo
          baseExp={character.baseExp}
          maxBaseExp={character.maxBaseExp}
          jobExp={character.jobExp}
          maxJobExp={character.maxJobExp}
        />
      </div>
      <RadarChartSection radarData={radarData} radarOptions={radarOptions} />
    </div>
  );
}

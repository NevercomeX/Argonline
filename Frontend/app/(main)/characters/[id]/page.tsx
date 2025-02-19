// src/app/characters/[id]/page.tsx
import { Character } from "@/types";
import { CombatStats } from "@/types/CombatStats";

// Importamos los sprites de los trabajos
import { jobGenderSprites } from "@/components/GameComponents/Jobs/JobSpritesMap";

// Importamos los componentes necesarios
import CharacterEquipmentInventory from "@/components/GameComponents/Characters/Details/CharacterEquipmentInventory";
import RadarChartSection from "@/components/GameComponents/Characters/Details/RadarChartSection";
import CombatStatsDisplay from "@/components/GameComponents/Characters/Details/CombatStatsDisplay";

// Importamos las utilidades centralizadas
import { getCharacterById } from "@/utils/gameUtils/characterApi";
import { getEquipmentMenu } from "@/utils/gameUtils/equipmentApi";
import { getInventory } from "@/utils/gameUtils/inventoryApi";
import { getStatsCharacter } from "@/utils/gameUtils/statsApi";

interface CharacterDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function CharacterDetailsPage({
  params,
}: CharacterDetailsPageProps) {
  const { id } = await params;
  const characterId = Number(id);

  // Carga inicial SSR para datos base
  const character: Character = await getCharacterById(characterId);
  const equipmentMenu = await getEquipmentMenu(character.id);
  const inventoryData = await getInventory(character.id);
  const statsData: CombatStats = await getStatsCharacter(character.id);

  // Transformamos la data para el componente
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

  const jobSpritePath =
    jobGenderSprites[character.jobclass] || "/default/path.gif";
  const characterSprite = `${jobSpritePath}_${character.gender || "male"}.gif`;

  const radarData = {
    labels: ["ATK", "MATK", "DEF", "MDEF", "CRIT", "ASPD"],
    datasets: [
      {
        label: "Character Stats",
        data: [
          statsData.ATK || 0,
          statsData.MATK || 0,
          statsData.DEF || 0,
          statsData.MDEF || 0,
          statsData.CRIT || 0,
          statsData.ASPD || 0,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 3,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        max: 150,
        min: 0,
        angleLines: { color: "#ccc" },
        grid: { color: "#ddd" },
        ticks: { display: true, color: "#333" },
        pointLabels: {
          color: "#333",
          font: { size: 15 },
        },
      },
    },
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="flex flex-row mx-auto gap-12">
      <div className=" border-gray-300 p-4  ">
        <CharacterEquipmentInventory
          characterId={character.id}
          characterName={character.name}
          characterSprite={characterSprite}
          initialEquipmentSlots={equipmentSlots}
          initialInventoryItems={inventoryItems}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Componente de estadísticas actualizado en tiempo real */}
        </div>
        <RadarChartSection radarData={radarData} radarOptions={radarOptions} />
      </div>
      <CombatStatsDisplay characterData={character} />
    </div>
  );
}

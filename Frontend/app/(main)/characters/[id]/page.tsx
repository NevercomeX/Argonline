// app/(main)/characters/[id]/page.tsx
import { Character } from "../../../../types";
import { jobGenderSprites } from "../../../../components/Jobs/JobSpritesMap";
import { getEquipmentSlotsByCharacterId } from "../../../utils/gameUtils/equipmentApi";
import { getInventory } from "../../../utils/gameUtils/inventoryApi";
import { getItemsById } from "../../../utils/gameUtils/itemsApi";
import CharacterInfo from "../../../../components/Characters/Details/CharacterInfo";
import CombatStats from "../../../../components/Characters/Details/CombatStats";
import HealthManaBars from "../../../../components/Characters/Details/HealthManaBars";
import ExperienceInfo from "../../../../components/Characters/Details/ExperienceInfo";
import RadarChartSection from "../../../../components/Characters/Details/RadarChartSection";
import EquipmentInventorySection from "../../../../components/Characters/Details/EquipmentInventorySection";

interface CharacterDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function CharacterDetailsPage({ params }: CharacterDetailsPageProps) {
  const { id } = params;

  // Obtener detalles del personaje
  const characterResponse = await fetch(`${process.env.NEXT_PUBLIC_API_CHAR_URL}/characters/${id}`);
  if (!characterResponse.ok) {
    throw new Error("Failed to load character details.");
  }
  const character: Character = await characterResponse.json();

  // Obtener el equipo y el inventario
  const equipmentData = await getEquipmentSlotsByCharacterId(character.id);
  const inventoryData = await getInventory(character.id);

  // Formatear el equipo
  const equipmentSlots = await Promise.all(
    equipmentData
      ? Object.keys(equipmentData)
          .filter((slotName) => slotName !== "id" && slotName !== "characterId")
          .map(async (slotName) => {
            const slotData = equipmentData[slotName];
            let itemDetails = null;

            if (typeof slotData === "number") {
              itemDetails = await getItemsById(slotData);
            }

            const isInstance = !!itemDetails?.itemTemplate;
            return {
              slotName,
              displayName: slotName,
              itemId: slotData,
              itemName: isInstance
                ? itemDetails?.itemTemplate?.name
                : itemDetails?.name || "Vacío",
              itemIcon: isInstance
                ? itemDetails?.itemTemplate?.itemIcon
                : itemDetails?.itemIcon || "",
              isInstance,
              templateId: isInstance ? itemDetails?.itemTemplate?.id : null,
            };
          })
      : [] // Si equipmentData es null o undefined, devolver un array vacío
  );

  // Formatear el inventario
  const inventoryItems = inventoryData
    ? inventoryData.map((item: any) => {
        const itemInstance = item.itemInstance; // Instancia de ítem, si existe
        const itemTemplate = itemInstance?.itemTemplate; // Template de la instancia, si existe
        const itemData = item.item; // Ítem normal, si existe

        return {
          id: item.itemInstanceId || item.itemId, // ID del ítem o de la instancia
          templateId: itemTemplate?.id || itemData?.id, // ID del template si es instancia
          name: itemTemplate?.name || itemData?.name || "Unknown Item", // Nombre del ítem
          quantity: item.quantity, // Cantidad
          equipable: itemTemplate?.equipable || itemData?.equipable || false, // Si es equipable
          equipmentSlot: itemTemplate?.equipmentSlot || itemData?.equipmentSlot || "Unknown Slot", // Slot de equipamiento
          isInstance: !!item.itemInstanceId, // Si es una instancia
          itemIcon: itemTemplate?.itemIcon || itemData?.itemIcon, // Icono del ítem
        };
      })
    : []; // Si inventoryData es null o undefined, devolver un array vacío

  // Ruta del sprite del personaje
  const jobSpritePath = jobGenderSprites[character.jobclassId] || "/default/path.gif";
  const sprtroute = `${jobSpritePath}_${character.gender}.gif`;

  // Datos para el gráfico de radar
  const radarData = {
    labels: ["Atk", "mAtk", "Def", "mDef", "Max HP", "Max MP"],
    datasets: [
      {
        label: "Character Stats",
        data: [
          character?.attackPower || 0,
          character?.magicPower || 0,
          character?.defense || 0,
          character?.magicDefense || 0,
          character?.maxHealth || 0,
          character?.maxMana || 0,
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
      <EquipmentInventorySection
        characterId={parseInt(id, 10)}
        equipmentSlots={equipmentSlots}
        inventoryItems={inventoryItems}
        characterName={character.name} // Nueva prop
        characterSprite={sprtroute} // Nueva prop
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CharacterInfo
          baseLevel={character.baseLevel}
          jobLevel={character.jobLevel}
          gender={character.gender}
        />
        <CombatStats
          attackPower={character.attackPower}
          defense={character.defense}
          magicPower={character.magicPower}
          magicDefense={character.magicDefense}
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
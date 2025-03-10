"use client";
import React from "react";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateZeny } from "@/store/userSlice";
import { sellItem } from "@/utils/gameUtils/itemTransactionsApi";
import { getInventory } from "@/utils/gameUtils/inventoryApi";

// Interfaz para los ítems del inventario
export interface InventoryItem {
  itemId: number;
  instanceId: number | null;
  name: string;
  quantity: number;
  sprite: string;
  item: {
    name: string;
    sprite: string;
    sellPrice: number;
    // ... otras propiedades que necesites
  };
}

const INVENTORY_ITEM_TYPE = "INVENTORY_ITEM";

const DraggableInventoryItem: React.FC<{ item: InventoryItem }> = ({
  item,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: INVENTORY_ITEM_TYPE,
      item: { ...item },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [item]
  );

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="border rounded p-2 flex flex-col items-center cursor-move"
    >
      <Image
        src={`/items${item.item.sprite}`}
        alt={item.item.name}
        width={32}
        height={32}
        className="object-contain"
      />
      <p className="text-xs font-medium mt-1">{item.item.name}</p>
      <p className="text-xs text-gray-500">x {item.quantity}</p>
      <p className="text-xs text-red-600">Venta: {item.item.sellPrice}</p>
    </div>
  );
};

const SellDropArea: React.FC<{ onDrop: (item: InventoryItem) => void }> = ({
  onDrop,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: INVENTORY_ITEM_TYPE,
      drop: (draggedItem: InventoryItem) => onDrop(draggedItem),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  return (
    <div
      ref={drop}
      className={`p-4 border rounded flex items-center justify-center ${
        isOver && canDrop ? "bg-red-100" : "bg-gray-100"
      }`}
      style={{ minHeight: "100px" }}
    >
      <p className="text-lg">Arrastra aquí para VENDER</p>
    </div>
  );
};

interface ShopSellProps {
  characterId: number;
}

const ShopSell: React.FC<ShopSellProps> = ({ characterId }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Obtener ítems del inventario del personaje
  const { data: inventoryData = [] } = useQuery<InventoryItem[]>({
    queryKey: ["inventory", characterId],
    queryFn: async () => {
      const res = await getInventory(characterId);
      console.log("response inventory", res);
      return res;
    },
  });

  // Mutación para venta
  const sellMutation = useMutation({
    mutationFn: async (item: InventoryItem) => {
      // Se asume venta de 1 unidad
      const res = await sellItem({
        characterId,
        inventoryItemId: item.itemId,
        quantity: 1,
      });

      console.log("response sellItem", res);
      return res.data;
    },
    onSuccess: (data, item) => {
      queryClient.invalidateQueries({ queryKey: ["inventory", characterId] });
      dispatch(updateZeny((prevZeny: number) => prevZeny + data.gainedZeny));
      alert(`Venta exitosa de ${item.item.name}`);
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || "Error al vender ítem");
    },
  });

  const handleSell = (item: InventoryItem) => {
    sellMutation.mutate(item);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Tu Inventario</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {inventoryData.map((item) => (
          <DraggableInventoryItem key={item.itemId || 0} item={item} />
        ))}
      </div>
      <SellDropArea onDrop={handleSell} />
    </div>
  );
};

export default ShopSell;

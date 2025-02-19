// src/components/GameComponents/Shop/ShopWindow.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateZeny } from "@/store/userSlice"; // Acción de Redux para actualizar el zeny
import { purchaseItem, sellItem } from "@/utils/gameUtils/itemTransactionsApi";
import { getShopItems } from "@/utils/gameUtils/shopApi";
import { getInventory } from "@/utils/gameUtils/inventoryApi";
import { Item } from "@/types";

// Definimos los tipos para react-dnd
const SHOP_ITEM_TYPE = "SHOP_ITEM";
const INVENTORY_ITEM_TYPE = "INVENTORY_ITEM";

// Interfaces de datos
export interface ShopItem {
  id: number;
  name: string;
  sprite: string;
  buyPrice: number;
  sellPrice: number;
}

export interface InventoryItem {
  itemId: number;
  instanceId: number | null;
  name: string;
  quantity: number;
  sprite: string;
  // Se puede extender con más campos (por ejemplo, para mostrar precio de venta)
  sellPrice: number;
}

// Componente draggable para los ítems de la tienda
const DraggableShopItem: React.FC<{ item: ShopItem }> = ({ item }) => {
  console.log(item.sprite);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: SHOP_ITEM_TYPE,
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
        src={`/items${item.sprite}`}
        alt={item.name}
        width={32}
        height={32}
        className="object-contain"
      />
      <p className="text-xs font-medium mt-1">{item.name}</p>
      <p className="text-xs text-green-600">Precio: {item.buyPrice}</p>
    </div>
  );
};

// Componente draggable para los ítems del inventario (para vender)
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
        src={`/items${item.sprite}`}
        alt={item.name}
        width={32}
        height={32}
        className="object-contain"
      />
      <p className="text-xs font-medium mt-1">{item.name}</p>
      <p className="text-xs text-gray-500">x {item.quantity}</p>
      <p className="text-xs text-red-600">Venta: {item.sellPrice}</p>
    </div>
  );
};

// Área droppable para comprar (acepta SHOP_ITEM)
const PurchaseDropArea: React.FC<{ onDrop: (item: ShopItem) => void }> = ({
  onDrop,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: SHOP_ITEM_TYPE,
      drop: (draggedItem: ShopItem) => onDrop(draggedItem),
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
      className={`p-4 border rounded flex items-center justify-center ${isOver && canDrop ? "bg-green-100" : "bg-gray-100"}`}
      style={{ minHeight: "100px" }}
    >
      <p className="text-lg">Arrastra aquí para COMPRAR</p>
    </div>
  );
};

// Área droppable para vender (acepta INVENTORY_ITEM)
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
      className={`p-4 border rounded flex items-center justify-center ${isOver && canDrop ? "bg-red-100" : "bg-gray-100"}`}
      style={{ minHeight: "100px" }}
    >
      <p className="text-lg">Arrastra aquí para VENDER</p>
    </div>
  );
};

interface ShopWindowProps {
  characterId: number;
}

const ShopWindow: React.FC<ShopWindowProps> = ({ characterId }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Obtener ítems de la tienda
  const { data: shopItems = [] } = useQuery<ShopItem[]>({
    queryKey: ["shopItems"],
    queryFn: async () => {
      const res = await getShopItems();
      return res.data.items;
    },
  });

  // Obtener ítems del inventario del personaje
  const { data: inventoryData = [] } = useQuery<InventoryItem[]>({
    queryKey: ["inventory", characterId],
    queryFn: async () => {
      const res = await getInventory(characterId);
      console.log("response inventory", res);
      return res;
    },
  });

  // Mutación para compra
  const purchaseMutation = useMutation({
    mutationFn: async (item: ShopItem) => {
      // Se asume compra de 1 unidad
      const res = await purchaseItem({
        characterId,
        itemId: item.id,
        quantity: 1,
      });
      return res.data;
    },
    onSuccess: (data, item) => {
      queryClient.invalidateQueries({ queryKey: ["inventory", characterId] });
      // Actualizamos el zeny en Redux (se espera que la API devuelva el zeny restante)
      dispatch(updateZeny(data.remainingZeny));
      alert(`Compra exitosa de ${item.name}`);
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || "Error al comprar ítem");
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
      return res.data;
    },
    onSuccess: (data, item) => {
      queryClient.invalidateQueries({ queryKey: ["inventory", characterId] });
      // Actualizamos el zeny en Redux según la ganancia de la venta
      dispatch(updateZeny((prevZeny: number) => prevZeny + data.gainedZeny));
      alert(`Venta exitosa de ${item.name}`);
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || "Error al vender ítem");
    },
  });

  const handlePurchase = (item: ShopItem) => {
    purchaseMutation.mutate(item);
  };

  const handleSell = (item: InventoryItem) => {
    sellMutation.mutate(item);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tienda</h1>
      <div className="grid grid-cols-2 gap-8">
        {/* Sección de compra */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Ítems en Venta</h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {shopItems.map((item) => (
              <DraggableShopItem key={item.id} item={item} />
            ))}
          </div>
          <PurchaseDropArea onDrop={handlePurchase} />
        </div>

        {/* Sección de venta */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Tu Inventario</h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {inventoryData.map((item) => (
              <DraggableInventoryItem
                key={`${item.itemId}-${item.instanceId || "normal"}`}
                item={item}
              />
            ))}
          </div>
          <SellDropArea onDrop={handleSell} />
        </div>
      </div>
    </div>
  );
};

export default ShopWindow;

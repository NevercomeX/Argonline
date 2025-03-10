"use client";
import React from "react";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateZeny } from "@/store/userSlice";
import { purchaseItem } from "@/utils/gameUtils/itemTransactionsApi";
import { getShopItems } from "@/utils/gameUtils/shopApi";

// Definimos el tipo para react-dnd
const SHOP_ITEM_TYPE = "SHOP_ITEM";

// Interfaz para los ítems de la tienda
export interface ShopItem {
  id: number;
  name: string;
  sprite: string;
  buyPrice: number;
  sellPrice: number;
}

const DraggableShopItem: React.FC<{ item: ShopItem }> = ({ item }) => {
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
      className={`p-4 border rounded flex items-center justify-center ${
        isOver && canDrop ? "bg-green-100" : "bg-gray-100"
      }`}
      style={{ minHeight: "100px" }}
    >
      <p className="text-lg">Arrastra aquí para COMPRAR</p>
    </div>
  );
};

interface ShopPurchaseProps {
  characterId: number;
}

const ShopPurchase: React.FC<ShopPurchaseProps> = ({ characterId }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Obtener ítems de la tienda
  const { data: shopItems = [] } = useQuery<ShopItem[]>({
    queryKey: ["shopItems"],
    queryFn: async () => {
      const res = await getShopItems();
      console.log("response getShopItems", res.data.items);
      return res.data.items;
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
      dispatch(updateZeny(data.remainingZeny));
      alert(`Compra exitosa de ${item.name}`);
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || "Error al comprar ítem");
    },
  });

  const handlePurchase = (item: ShopItem) => {
    purchaseMutation.mutate(item);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Ítems en Venta</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {shopItems.map((item) => (
          <DraggableShopItem key={item.id} item={item} />
        ))}
      </div>
      <PurchaseDropArea onDrop={handlePurchase} />
    </div>
  );
};

export default ShopPurchase;

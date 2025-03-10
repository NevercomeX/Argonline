"use client";
import React from "react";
import ShopPurchase from "@/components/GameComponents/Market/Purchache/ShopPurchase";

const ShopWindow: React.FC = ({}) => {
  const characterId = 1; // Ejemplo: obtener este dato del estado global o de la sesión
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tienda</h1>
      <div className="grid grid-cols-1 gap-8">
        <ShopPurchase characterId={characterId} />
      </div>
    </div>
  );
};

export default ShopWindow;

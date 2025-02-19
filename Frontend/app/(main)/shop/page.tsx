// app/(main)/shop/page.tsx
"use client";

import React from "react";
import ShopWindow from "@/components/GameComponents/Shop/ShopWindow";

const ShopPage: React.FC = () => {
  // Se asume que ya tienes el characterId del usuario
  const characterId = 1; // Ejemplo: obtener este dato del estado global o de la sesión

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <ShopWindow characterId={characterId} />
    </main>
  );
};

export default ShopPage;

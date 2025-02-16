// app/utils/itemsApi.ts

// Función para obtener los detalles de un ítem por su ID
export const getItemsById = async (itemId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/items/${itemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching item with ID ${itemId}: ${response.statusText}`,
      );
    }

    const itemDetails = await response.json();
    return itemDetails;
  } catch (error) {
    console.error(`Error fetching item with ID ${itemId}:`, error);
    return null;
  }
};

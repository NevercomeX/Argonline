// app/utils/gameUtils/characterApi.ts

/**
 * Obtiene los detalles de un personaje dado su ID.
 */
export const getCharacterById = async (characterId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/characters/${characterId}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error(`Error fetching character: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching character:", error);
    throw error;
  }
};
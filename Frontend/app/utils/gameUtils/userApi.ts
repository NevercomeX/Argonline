//obtener los characters de los usuarios

// Función para obtener los detalles de un usuario por su ID
export const getUsersById = async (userId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_CHAR_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user with ID ${userId}: ${response.statusText}`);
    }

    const userDetails = await response.json();
    return userDetails;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return null;
  }
};
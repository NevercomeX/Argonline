// recipeSeed.js

import { prisma, JobName } from "../src/prismaClient/prismaClient";
export async function recipeSeed() {
  // Definición de recetas
  // Cada receta incluye:
  // - resultItemName: el nombre del ítem resultante (ya debe existir en la tabla Item)
  // - ingredients: un array de objetos con el nombre del ingrediente y la cantidad requerida
  // - successRate, skillRequired, jobRequired y minLevel: datos adicionales de la receta
  const recipeDefinitions = [
    {
      resultItemName: "Coin",
      ingredients: [
        { name: "Copper Key", quantity: 1 },
        { name: "Copper Chest", quantity: 1 },
      ],
      successRate: 0.8,
      skillRequired: "Smithing",
      jobRequired: JobName.BLACKSMITH, // Debe coincidir con un valor del enum JobName
      minLevel: 10,
    },
    {
      resultItemName: "Necklace of Acolyte",
      ingredients: [
        { name: "Novice Dagger", quantity: 1 },
        { name: "Health Potion", quantity: 2 },
      ],
      successRate: 0.75,
      skillRequired: "Tailoring",
      jobRequired: JobName.ALCHEMIST, // Debe coincidir con un valor del enum JobName
      minLevel: 5,
    },
  ];

  // Reunir todos los nombres de ítems involucrados (tanto los resultantes como los ingredientes)
  const allItemNames = new Set();
  recipeDefinitions.forEach((recipe) => {
    allItemNames.add(recipe.resultItemName);
    recipe.ingredients.forEach((ing) => allItemNames.add(ing.name));
  });
  const itemNamesArray = Array.from(allItemNames) as string[];

  // Buscar en la tabla Item todos los ítems involucrados
  const items = await prisma.item.findMany({
    where: { name: { in: itemNamesArray } },
  });
  const missingItems = itemNamesArray.filter(
    (name) => !items.find((item) => item.name === name)
  );
  if (missingItems.length > 0) {
    console.error(
      `Los siguientes ítems necesarios para las recetas no se encontraron: ${missingItems.join(", ")}`
    );
    return;
  }

  // Crear cada receta
  for (const recipeDef of recipeDefinitions) {
    // Buscar el ítem resultante
    const resultItem = items.find((item) => item.name === recipeDef.resultItemName);
    if (!resultItem) {
      console.error(`No se encontró el ítem resultante ${recipeDef.resultItemName}.`);
      continue;
    }

    // Construir el array requiredItems a partir de los ingredientes
    const requiredItems = recipeDef.ingredients.map((ing) => {
      const foundIngredient = items.find((item) => item.name === ing.name)!;
      return { itemId: foundIngredient.id, quantity: ing.quantity };
    });

    // Verificar si la receta ya existe para ese ítem resultante
    const existingRecipe = await prisma.recipe.findFirst({
      where: { resultItemId: resultItem.id },
    });
    if (!existingRecipe) {
      await prisma.recipe.create({
        data: {
          resultItemId: resultItem.id,
          requiredItems: requiredItems, // Campo de tipo JSON (se puede pasar un array de objetos)
          successRate: recipeDef.successRate,
          skillRequired: recipeDef.skillRequired,
          jobRequired: recipeDef.jobRequired,
          minLevel: recipeDef.minLevel,
        },
      });
    } else {
      console.log(`La receta para ${recipeDef.resultItemName} ya existe.`);
    }
  }
}

import { prisma } from "../src/prismaClient/prismaClient";
export async function mapSeed() {
  const maps = [
    {
      name: "Prontera",
      file: "prontera.gat",
      width: 200,
      height: 200,
    },
    {
      name: "Geffen",
      file: "geffen.gat",
      width: 180,
      height: 180,
    },
    {
      name: "Payon",
      file: "payon.gat",
      width: 160,
      height: 160,
    },
    {
      name: "Morroc",
      file: "morroc.gat",
      width: 220,
      height: 220,
    },
    {
      name: "Alberta",
      file: "alberta.gat",
      width: 150,
      height: 150,
    },
  ];

  for (const map of maps) {
    try {
      const existingMap = await prisma.map.findUnique({
        where: { name: map.name },
      });

      if (!existingMap) {
        await prisma.map.create({
          data: {
            name: map.name,
            file: map.file,
            width: map.width,
            height: map.height,
          },
        });
      } else {
      }
    } catch (error) {
      console.error(`Error creating map ${map.name}:`, error);
    }
  }
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getItems() {
  return await prisma.item.findMany();
}

export async function getItemsById(id) {
  return await prisma.item.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function getItemsByName(name) {
  return await prisma.item.findUnique({
    where: { name: name },
  });
}

//get item name by id
export async function getItemNameById(id) {
  const item = await prisma.item.findUnique({
    where: { id: 6 },
  });
  return item.name;
}

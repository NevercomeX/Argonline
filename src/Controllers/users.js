import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function getUsersById(id) {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function getUsersByName(name) {
  return await prisma.user.findUnique({
    where: { name: name },
  });
}

export async function getUsersByEmail(email) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}

export async function getUsersByPassword(password) {
  return await prisma.user.findUnique({
    where: { password: password },
  });
}

export async function createUsers(data) {
  return await prisma.user.create({
    data,
  });
}

export async function updateUsers(id, data) {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data,
  });
}

export async function deleteUsers(id) {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
}

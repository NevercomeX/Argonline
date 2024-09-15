import { prisma } from "../../Prisma/prismaClient.js";
export async function getJobClasses() {
  return await prisma.jobClass.findMany();
}

export async function getJobClassById(id) {
  return await prisma.jobClass.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function getJobClassByName(name) {
  return await prisma.jobClass.findUnique({
    where: { name: name },
  });
}

//get jobclass name by id
export async function getJobClassNameById(id) {
  const jobClass = await prisma.jobClass.findUnique({
    where: { id: parseInt(id) },
  });
  return jobClass.name;
}

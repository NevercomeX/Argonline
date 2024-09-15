import { prima } from '../../Prisma/prismaClient.js';

export async function getAllUsers(){
  return await prisma.users.findMany();
}

export async function getAllCharacterFromUsers(id){
  return await prisma.users.findMany({
    where:{
      id: parseInt(id)
    }
  })
}

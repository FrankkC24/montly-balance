import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addTransaction = async (transaction) => {
  try {
    await prisma.transaction.create({
      data: transaction,
    });
    console.log('Transacción añadida con éxito');
  } catch (error) {
    console.error('Error al añadir transacción:', error);
  }
};

export const getTransactions = async () => {
  try {
    return await prisma.transaction.findMany();
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    return [];
  }
};

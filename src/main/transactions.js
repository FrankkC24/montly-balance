import prisma from './db.js';

export const addTransaction = async (type, amount, category, date, userId) => {
  if (type === 'income') {
    return await prisma.income.create({
      data: { amount, category, date, userId },
    });
  } else if (type === 'expense') {
    return await prisma.expense.create({
      data: { amount, category, date, userId },
    });
  }
};

export const getTransactionsData = async (userId) => {
  const incomes = await prisma.income.findMany({ where: { userId } });
  const expenses = await prisma.expense.findMany({ where: { userId } });

  const categories = ['Hogar', 'Transporte', 'Entretenimiento'];
  const incomeData = categories.map((category) => 
    incomes.filter((income) => income.category === category).reduce((sum, inc) => sum + inc.amount, 0)
  );
  const expenseData = categories.map((category) => 
    expenses.filter((expense) => expense.category === category).reduce((sum, exp) => sum + exp.amount, 0)
  );

  return { incomeData, expenseData, categories };
};

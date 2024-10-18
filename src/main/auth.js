import bcrypt from 'bcrypt';
import prisma from './db.js';

export const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
};

export const loginUser = async (username, password) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
};

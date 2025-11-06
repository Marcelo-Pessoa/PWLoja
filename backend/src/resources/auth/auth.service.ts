import { PrismaClient, User } from '../../generated/prisma';
import { LoginDto } from './auth.types';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

export const checkCredentials = async (
  data: LoginDto,
): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (!user) return null;

  const ok = await bcryptjs.compare(data.password, user.password);
  if (ok) return user;
  return null;
};

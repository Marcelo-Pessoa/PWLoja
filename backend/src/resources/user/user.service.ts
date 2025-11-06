import { PrismaClient, User } from '../../generated/prisma';
import { CreateUserDto, UpdateUserDto, UserDto } from './user.types';
import bcryptjs from 'bcryptjs';
import getEnv from '../../utils/getEnv';

const prisma = new PrismaClient();
const env = getEnv();

export const getAllUsers = async (): Promise<User[] | null> => {
  return prisma.user.findMany();
};

export const createUser = async (user: CreateUserDto): Promise<User | null> => {
  const salt = await bcryptjs.genSalt(env.BCRYPT_ROUNDS);
  user.password = await bcryptjs.hash(user.password, salt);

  return prisma.user.create({ data: user });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findFirst({ where: { email } });
};

export const findUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findFirst({ where: { id } });
};

export const updateUser = async (
  user: UpdateUserDto,
  id: string,
): Promise<User | null> => {
  return prisma.user.update({ where: { id }, data: user });
};

export const deleteUser = async (id: string): Promise<User | null> => {
  return prisma.user.delete({
    where: { id },
  });
};

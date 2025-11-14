import { PrismaClient, User } from '../../generated/prisma';
import { CreateUserDto, UpdateUserDto, UserDto } from './user.types';
import { genSalt, hash } from 'bcryptjs';
import getEnv from '../../utils/getEnv';

const prisma = new PrismaClient();
const env = getEnv();

export const getAllUsers = async (): Promise<UserDto[]> => {
  const users = await prisma.user.findMany();

  return users.map(({ password, ...user }) => user);
};

export const createUser = async (
  data: CreateUserDto,
): Promise<UserDto | null> => {
  const salt = await genSalt(env.BCRYPT_ROUNDS);
  const passwrd = await hash(data.password, salt);
  const { password, ...user } = await prisma.user.create({
    data: {
      ...data,
      password: passwrd,
    },
  });

  return user;
};

export const findUserByEmail = async (
  email: string,
): Promise<UserDto | null> => {
  const user = await prisma.user.findFirst({
    where: { email },
    omit: { password: true },
  });

  return user;
};

export const findUserById = async (id?: string): Promise<User | null> => {
  if (!id) return null;
  return await prisma.user.findFirst({
    where: { id },
  });
};

export const updateUser = async (
  user: UpdateUserDto,
  id: string,
): Promise<UserDto | null> => {
  const userUpdate = await prisma.user.update({
    where: { id },
    data: user,
    omit: { password: true },
  });

  return userUpdate;
};

export const deleteUser = async (id: string): Promise<UserDto | null> => {
  const userRecord = await prisma.user.delete({
    where: { id },
    omit: { password: true },
  });

  return userRecord;
};

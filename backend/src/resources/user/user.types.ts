import { User } from '../../generated/prisma';

export type CreateUserDto = Pick<
  User,
  'name' | 'email' | 'password' | 'typeId'
>;
export type UpdateUserDto = Pick<
  User,
  'name' | 'email' | 'password' | 'typeId'
>;
export type UserDto = Omit<User, 'password'>;

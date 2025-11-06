import { User } from '../../generated/prisma';
import { CreateUserDto } from '../user/user.types';

export type SignUpDto = Omit<CreateUserDto, 'typeId'>;
export type LoginDto = Pick<User, 'email' | 'password'>;

import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  getAllUsers,
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
} from './user.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './user.types';
import { NOTFOUND } from 'dns';

const index = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const data = req.body as CreateUserDto;

  try {
    if (await findUserByEmail(data.email)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ReasonPhrases.BAD_REQUEST);
    }
    const user = await createUser(data);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.params.id!);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const update = async (req: Request, res: Response) => {
  const data = req.body as UpdateUserDto;

  try {
    if (!(await findUserById(req.params.id!))) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ReasonPhrases.BAD_REQUEST);
    }
    const user = await updateUser(data, req.params.id!);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const resposta = await deleteUser(req.params.id!);
    if (resposta) return res.status(StatusCodes.NO_CONTENT);
    return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default { index, create, read, update, remove };

import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  findUserByEmail,
  findUserById,
} from '../user/user.service';
import { checkCredentials } from './auth.service';
import { LoginDto, SignUpDto } from './auth.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserTypes } from '../userType/userType.constants';

const login = async (req: Request, res: Response) => {
  const data = req.body as LoginDto;

  try {
    const user = await checkCredentials(data);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(ReasonPhrases.UNAUTHORIZED);
    }
    req.session.userType = user.typeId;
    req.session.userId = user.id;
    res
      .status(StatusCodes.OK)
      .json({ userId: user.id, userType: user.typeId, userName: user.name });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const logout = async (req: Request, res: Response) => {
  delete req.session.userId;
  delete req.session.userType;
  res.status(StatusCodes.OK).json(ReasonPhrases.OK);
};

const signup = async (req: Request, res: Response) => {
  const data = req.body as SignUpDto;

  try {
    if (await findUserByEmail(data.email)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Email informado ja esta sendo usado' });
    }

    const newUsuario = await createUser({
      ...data,
      typeId: UserTypes.client,
    });
    res.status(StatusCodes.CREATED).json(newUsuario);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const me = async (req: Request, res: Response) => {
  const user = await findUserById(req.session.userId);
  if (user) {
    res
      .status(StatusCodes.OK)
      .json({ userId: user.id, userType: user.typeId, userName: user.name });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
  }
};

export default { login, logout, signup, me };

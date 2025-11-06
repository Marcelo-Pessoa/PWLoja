import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) next();
  else res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
};

export default isAuth;

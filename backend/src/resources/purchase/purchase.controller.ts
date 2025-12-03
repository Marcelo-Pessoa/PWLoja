import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const cart = (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!user)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(ReasonPhrases.UNAUTHORIZED);
};

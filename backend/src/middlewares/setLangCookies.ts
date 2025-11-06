import { Request, NextFunction, Response } from 'express';
import getEnv from '../utils/getEnv';

const env = getEnv();

const setLangCookie = (req: Request, res: Response, next: NextFunction) => {
  if (!('lang' in req.cookies))
    res.cookie('lang', env.DEFAULT_LANGUAGE, {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
  next();
};

export default setLangCookie;

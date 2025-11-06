import { Request, Response } from 'express';
import { LanguageChangeDto } from './language.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

function changeLanguage(req: Request, res: Response) {
  const { lang } = req.body as LanguageChangeDto;

  res.cookie('lang', lang).status(StatusCodes.OK).json(ReasonPhrases.OK);
}

export default { changeLanguage };

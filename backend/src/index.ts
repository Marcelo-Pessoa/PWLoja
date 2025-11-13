import express from 'express';
import getEnv from './utils/getEnv';
import router from './router/Router';
import cookieParser from 'cookie-parser';
import setLangCookie from './middlewares/setLangCookies';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '../src/generated/prisma';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json';
import cors from 'cors';

declare module 'express-session' {
  interface SessionData {
    userType: number;
    userId: string;
  }
}

const env = getEnv();
const app = express();
const prisma = new PrismaClient();

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);
app.use(cookieParser());
app.use(setLangCookie);
app.use(
  session({
    genid: (req) => uuidv4(),
    secret: env.SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 30 * 60 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
    cookie: { maxAge: 2 * 60 * 60 * 1000, httpOnly: true, secure: true },
  }),
);

app.use(router);

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Aplicação rodando na porta ${env.PORT}.`);
});

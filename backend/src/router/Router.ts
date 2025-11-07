import { Router } from 'express';
import productRouter from '../resources/product/product.router';
import languageRouter from '../resources/language/language.router';
import userRouter from '../resources/user/user.router';
import authRouter from '../resources/auth/auth.router';

const router = Router();

router.use(
  '/product',
  // #swagger.tags = ['Product']
  productRouter,
);
router.use(
  '/language',
  // #swagger.tags = ['Language']
  languageRouter,
);
router.use(
  '/user',
  // #swagger.tags = ['User']
  userRouter,
);
router.use(
  '/auth',
  // #swagger.tags = ['Auth']
  authRouter,
);

export default router;

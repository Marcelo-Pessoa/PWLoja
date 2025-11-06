import { Router } from 'express';
import authController from './auth.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', isAuth, authController.logout);

export default router;

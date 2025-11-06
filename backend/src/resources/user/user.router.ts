import { Router } from 'express';
import userController from './user.controller';
import checkAuthorization from '../../middlewares/checkAuthorization';
import validate from '../../middlewares/validate';
import userSchema from './user.schema';

const router = Router();

router.get('/', userController.index);
router.post(
  '/',
  checkAuthorization,
  validate(userSchema),
  userController.create,
);
router.get('/:id', userController.read);
router.put(
  '/:id',
  checkAuthorization,
  validate(userSchema),
  userController.update,
);
router.post('/id', checkAuthorization, userController.remove);

export default router;

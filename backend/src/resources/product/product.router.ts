import { Router } from 'express';
import productController from './product.controller';
import validate from '../../middlewares/validate';
import checkAuthorization from '../../middlewares/checkAuthorization';
import schema from './product.schema';

const router = Router();

router.get('/', productController.index);
router.post(
  '/',
  checkAuthorization,
  validate(schema),
  productController.create,
);
router.get('/:id', productController.read);
router.put(
  '/:id',
  checkAuthorization,
  validate(schema),
  productController.update,
);
router.delete('/:id', checkAuthorization, productController.remove);

export default router;

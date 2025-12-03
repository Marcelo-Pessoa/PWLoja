import { Router } from 'express';
import purchaseItemController from './purchaseItem.controller';

const router = Router();

router.post('/inc', purchaseItemController.inc);
router.post('/inc', purchaseItemController.dec);

export default router;

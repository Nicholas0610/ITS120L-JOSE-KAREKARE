import { Router } from 'express';
import { createOrder, listOrders, getOrder, updateOrderStatus, cancelOrder } from '../controllers/orders.controller';
const router = Router();

router.get('/', listOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', cancelOrder);

export default router;
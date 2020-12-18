import express from 'express';
const router = express.Router();
import { addOrderItems,getOrderById ,updateOrderToPaid , getMyOrders, getOrders, updateOrderToDelevered} from '../controllers/orderControllers.js'
import { protect , admin} from '../middleware/authMiddleware.js'
 
router.get('/', protect, admin, getOrders )
router.post('/', protect, addOrderItems )
router.get('/myorders', protect, getMyOrders )
router.get('/:id', protect, getOrderById )
router.put('/:id/pay', protect, updateOrderToPaid )
router.put('/:id/deliver', protect,admin, updateOrderToDelevered )

export default router;
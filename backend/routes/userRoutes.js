import express from 'express';
const router = express.Router();
import {
    authUser,
    getUserProfile,
    registerUser, 
    updateUserProfile,
    getUser,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
 
router.get('/', protect, admin, getUser )
router.post('/login', authUser )
router.get('/profile',protect, getUserProfile )
router.post('/', registerUser )
router.put('/profile',protect, updateUserProfile )
router.delete('/:id',protect, admin, deleteUser )
router.get('/:id',protect, admin, getUserById )
router.put('/:id',protect, admin, updateUser )

export default router;
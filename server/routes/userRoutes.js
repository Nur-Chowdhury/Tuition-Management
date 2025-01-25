import express from 'express';
import { findUserById, updateUser } from '../controllers/userControllers.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/findUserById/:id', verifyToken, findUserById);
router.post('/updateUser', verifyToken, updateUser);

export default router;
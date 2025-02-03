import express from 'express';
import { createAd, adInterested, getAds, adInterest, getAdByID, bookUser } from '../controllers/adController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createAd', verifyToken, createAd);
router.post('/adInterested', verifyToken, adInterested);
router.get('/getAds', verifyToken, getAds); 
router.post('/:adId/interest', verifyToken, adInterest); 
router.get('/getAd/:id', verifyToken, getAdByID);
router.post('/:id/book', bookUser, verifyToken);

export default router;
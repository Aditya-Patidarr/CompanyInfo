import express from 'express';
import { addReviewByCompanyId, getReviewsByCompanyId } from '../controllers/reviewController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { reviewFormValidator } from '../middlewares/formMiddleware.js';

const router = express.Router();

router.get('/company/:companyId', authenticate, getReviewsByCompanyId);
router.post('/company/:companyId', authenticate, reviewFormValidator, addReviewByCompanyId);
export default router;
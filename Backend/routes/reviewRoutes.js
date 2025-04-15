import express from 'express';
import { addReviewByCompanyId, getReviewDataByCompanyId,getReviewsByCompanyId } from '../controllers/reviewController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { reviewFormValidator } from '../middlewares/formMiddleware.js';

const router = express.Router();

router.get('/:companyId', authenticate, getReviewsByCompanyId);
router.get('/company/:companyId', authenticate, getReviewDataByCompanyId);
router.post('/company/:companyId', authenticate, reviewFormValidator, addReviewByCompanyId);
export default router;
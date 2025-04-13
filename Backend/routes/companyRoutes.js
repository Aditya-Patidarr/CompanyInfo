import express from 'express';
import { addCompany, getCompanies,getCompaniesByAverage,getCompaniesByNames,getCompaniesByNumberofReviews,getCompaniesByLocation,getCompanyById } from '../controllers/companyController.js';
import {companyFormValidator} from '../middlewares/formMiddleware.js';
import { authenticate } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post(
  '/',
  authenticate,
  companyFormValidator,
  addCompany
);

router.get('/',authenticate,getCompanies);

router.get('/byname',authenticate,getCompaniesByNames);

router.get('/byaverage',authenticate,getCompaniesByAverage);

router.get('/byrating',authenticate,getCompaniesByNumberofReviews);

router.get('/bylocation',authenticate,getCompaniesByLocation);

router.get('/:companyId',authenticate,getCompanyById);


export default router;
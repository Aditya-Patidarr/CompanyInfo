import { body, validationResult } from 'express-validator';

export const companyFormValidator = [
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('foundedOn').isDate().withMessage('Founded on must be a valid date'),
  body('city').notEmpty().withMessage('City is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const reviewFormValidator = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('reviewText').notEmpty().withMessage('Review text is required'),
  body('rating').isNumeric().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const registerFormValidator = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];  

export const loginFormValidator = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];  
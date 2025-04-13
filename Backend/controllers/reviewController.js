import { validationResult } from 'express-validator';
import Review from '../models/reviewModel.js';


export const addReviewByCompanyId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { companyId} = req.params;
    const { fullName,subject, reviewText, rating } = req.body;
    const review = new Review({
      companyId,
      userId: req.userId,
      fullName: fullName,
      subject,
      reviewText,
      rating,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const getReviewsByCompanyId = async (req, res) => {
    const { companyId } = req.params;
    try {
        const reviews = await Review.find({ companyId }).populate('userId', 'fullName');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
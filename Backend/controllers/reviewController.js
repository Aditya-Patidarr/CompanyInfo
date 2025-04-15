import { validationResult } from 'express-validator';
import Review from '../models/reviewModel.js';
import mongoose from 'mongoose';
import Company from '../models/companyModel.js'
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


export const getReviewDataByCompanyId = async (req, res) => {
    const { companyId } = req.params;
    try {
      const newid = mongoose.Types.ObjectId.createFromHexString(companyId);
      const stats = await Review.aggregate([
        { $match: { companyId: newid } },
        {
          $group: {
            _id: '$companyId',
            totalRatings: { $sum: 1 },
            averageRating: { $avg: '$rating' }
          }
        },
        {
          $project: {
            companyId: '$_id',
            totalRatings: 1,
            averageRating: {
              $divide: [
                { $round: [{ $multiply: ['$averageRating', 2] }, 0] },
                2
              ]
            }
          }
        }
      ]);
      if(!stats){
        throw new Error('No company with that Id exists');
      }
      res.status(200).json(stats[0]);
    } catch (error) {
      res.status(400).json({message:'Error in getting Ratings:',error});
    }
}

export const getReviewsByCompanyId = async (req, res) => {
    const { companyId } = req.params;
    try{
      const reviews = await Review.find({companyId});
      res.status(200).json(reviews);
    } catch (error) {
      res.status(400).json({message:'Error in getting Reviews:',error});
    }
}
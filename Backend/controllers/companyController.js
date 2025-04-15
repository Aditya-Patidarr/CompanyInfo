import { validationResult } from 'express-validator';
import Company from '../models/companyModel.js';
import Review from '../models/reviewModel.js';


export const addCompany = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const company = new Company(req.body);
        const response = await company.save();
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
export const getCompaniesByNames = async (req, res) => {
    try {
        const companies = await Company.find().sort({ companyName: 1 });
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

}
export const getCompaniesByAverage = async (req, res) => {
    try {
      const companies = await Review.aggregate([
        {
          $group: {
            _id: '$companyId',
            averageRating: { $avg: '$rating' },
          }
        },
        {
          $project: {
            averageRating: {
              $divide: [
                { $round: [{ $multiply: ['$averageRating', 2] }, 0] },
                2
              ]
            },
            companyId: '$_id'
          }
        },
        {
          $lookup: {
            from: 'companies',
            localField: 'companyId',
            foreignField: '_id',
            as: 'company'
          }
        },
        { $unwind: '$company' },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ['$company', { averageRating: '$averageRating' }]
            }
          }
        },
        { $sort: { averageRating: -1 } }
      ]);
      
      res.status(200).json(companies);
    } catch (error) {
      console.error('Error during aggregation:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };

export const getCompanyById = async (req, res) => {
    const { companyId } = req.params;
    try {
        const company = await Company.findById(companyId);
        if (!company) return res.status(404).json({ error: 'Company not found' });
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
export const getCompaniesByLocation = async (req, res) => {
    try {
        const companies = await Company.find().sort({ location: 1 });
        console.log(companies);
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }

}
export const getCompaniesByNumberofReviews = async (req, res) => {
    try {
        const companies = await Review.aggregate([
            {
              $group: {
                _id: '$companyId', 
                count: { $sum: 1 }, 
              },
            },
            {
              $lookup: {
                from: 'companies', 
                localField: '_id', 
                foreignField: '_id', 
                as: 'company', 
              },
            },
            {
              $unwind: '$company', 
            },
            {
              $sort: { count: -1 },
            },
          ]);
        const sortedCompanies = companies.map((com) => (com.company));
        res.status(200).json(sortedCompanies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }

}
export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  foundedOn: { type: Date, required: true },
  city: { type: String, required: true },
},{ timestamps: true });

export default mongoose.model('Company', companySchema);
import mongoose from 'mongoose';
import Employee from './Employee.js';
import Organization from './orginit.js';

const ReviewSchema = new mongoose.Schema({
    organization_name: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    Reviewedby: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    Reviewedto: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    ReviewContent: { type: String, required: true }
});

const Review = mongoose.model('Review', ReviewSchema);
export default Review;

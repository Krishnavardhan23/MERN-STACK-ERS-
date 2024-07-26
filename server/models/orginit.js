import mongoose from 'mongoose';

const orgSchema = new mongoose.Schema({
    organization_name: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    adminname: { type: String, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }]
});

const Organization = mongoose.model('Organization', orgSchema);
export default Organization;

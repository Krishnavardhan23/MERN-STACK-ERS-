import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const connectionURL = process.env.connectionURL;

const connectMongoDb = async () => {
    try {
        await mongoose.connect(connectionURL);
        console.log('Database connection successful');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1);
    }
};

export default connectMongoDb;

import mongoose from 'mongoose';

const connectToMongo = async (url) => {
    try {
        mongoose.set('strictQuery', false); 
        const res = await mongoose.connect(url);
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
    }
    finally {
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
    }
}

export default connectToMongo;

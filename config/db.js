import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('MongoDB already connected');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

export default connectDB;
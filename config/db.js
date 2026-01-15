import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to mongoDB : ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

 //exporting connnectDB function so it can be used in other parts of project
 module.exports = connectDB;
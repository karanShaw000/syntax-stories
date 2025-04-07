import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const dbUrl = process.env.DB_URL as string

const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      dbName: "syntax-stories"
    }
    console.log('Connecting to DB');
    await mongoose.connect(dbUrl, DB_OPTIONS)
    console.log('Connected Successfully...')
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;




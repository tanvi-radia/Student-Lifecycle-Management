//Connection file to mongo db
import mongoose from "mongoose";
import colors from "colors";

import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://admin:admin@cluster0.efx4k.mongodb.net/slms?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useNewUrlParser: true 
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

export default connectDB;

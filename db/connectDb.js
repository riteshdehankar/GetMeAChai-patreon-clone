import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected:", conn.connection.host);
    console.log("Mongo URI:", process.env.MONGO_URI)
  } catch (error) {
    console.error(error);
  }
};

export default connectDb;

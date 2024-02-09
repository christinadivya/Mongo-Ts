// src/db.ts
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mongo-practice", {
        // useNewUrlParser: true, // Deprecated, but harmless to leave
      //   useUnifiedTopology: true,
      // Add any other options you need here
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;

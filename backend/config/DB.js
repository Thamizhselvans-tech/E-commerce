import mongoose from "mongoose";
import colors from "colors";
import { MongoMemoryServer } from "mongodb-memory-server";
import userData from "../Data/users.js";
import productData from "../Data/products.js";
import User from "../Models/UserModels.js";
import Product from "../Models/ProductModels.js";

const autoSeed = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const createdUsers = await User.insertMany(userData);
      const adminUser = createdUsers[0]._id;
      const sampleProducts = productData.map((product) => ({
        ...product,
        user: adminUser,
      }));
      await Product.insertMany(sampleProducts);
      console.log("Database automatically seeded with sample products & users".green.bold);
    }
  } catch (err) {
    console.error("Auto-seeding error:", err.message);
  }
};

const ConnectDB = async () => {
  let uri = process.env.MONGODB_URI;
  let isFallbackNeeded = !uri || uri.includes("<password>") || uri.includes("your_mongodb");

  if (!isFallbackNeeded) {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected : ${conn.connection.host}`.white.underline.bold);
      await autoSeed();
      return;
    } catch (error) {
      console.log(`Connection to MONGODB_URI failed (${error.message}), falling back to MongoMemoryServer...`.yellow.bold);
    }
  }

  try {
    console.log("Initializing local in-memory MongoDB server...".yellow.bold);
    const mongoServer = await MongoMemoryServer.create({
      binary: { version: "4.2.24" },
    });
    uri = mongoServer.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected (In-Memory) : ${conn.connection.host}`.white.underline.bold);
    await autoSeed();
  } catch (error) {
    console.error(`MongoDB Connection Error : ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default ConnectDB;

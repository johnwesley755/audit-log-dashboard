const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined in the backend .env file");
    }

    console.log("MongoDB connection string loaded:", mongoUri.replace(/:[^:@]+@/, ":***@"));

    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected using configured Atlas URI");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
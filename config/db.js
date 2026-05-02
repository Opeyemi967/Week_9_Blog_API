// Import mongoose
// Mongoose helps Node.js communicate with MongoDB
const mongoose = require("mongoose");

// ========================================
// CONNECT TO MONGODB FUNCTION
// ========================================

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI stored in .env file
    // process.env.MONGODB_URI comes from dotenv
    const connectDB = await mongoose.connect(process.env.MONGODB_URI);

    // Success message
    // Shows database host connected successfully
    console.log(`MongoDB Connected: ${connectDB.connection.host}`);
  } catch (error) {
    // If database connection fails,
    // show the real reason
    console.error(`Database Connection Error: ${error.message}`);

    // Exit application with failure
    // This is professional practice
    process.exit(1);
  }
};

// Export function so server.js can use it
module.exports = connectDB;

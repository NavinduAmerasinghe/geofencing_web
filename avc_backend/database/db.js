const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully..");
  } catch (err) {
    console.error(`Error connecting to MongoDB database: ${err.message}`);
  }
};

module.exports = connectDB;

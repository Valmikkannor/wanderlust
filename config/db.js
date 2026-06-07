const mongoose = require("mongoose");

const connectDB = async() => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URL);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {

        console.log("Database Connection Error:", error);

        process.exit(1);
    }
};

module.exports = connectDB;
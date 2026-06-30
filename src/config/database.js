const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfull connection with MongoDB");
    }
    catch(e)
    {
        console.error("Error during MongoDB connection", e.message);
        process.exit(1);
    }
};

module.exports = connectDB;
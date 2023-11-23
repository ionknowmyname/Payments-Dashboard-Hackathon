const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const connectDB = async () => {

    // const uri = process.env.DATABASE;
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connection success")
}

module.exports = { connectDB }

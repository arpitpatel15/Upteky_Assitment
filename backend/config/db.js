const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.bup2ycw.mongodb.net/feedback`)
    .then(()=>console.log("DB Connected.."))
    .catch((error)=>console.log("Error : ",error))
}

module.exports = connectDB;


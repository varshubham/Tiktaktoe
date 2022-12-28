const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://shubham:shubham@cluster0.getc3vy.mongodb.net/tiktakto";

const connectToMongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully")
    })
}

module.exports = connectToMongo;
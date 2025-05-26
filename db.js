const mongoose = require('mongoose')

require('dotenv').config();
const mongoURL = process.env.MONGO_DB_URL_LOCAL;
// const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("connected to mongoDB server");
})

db.on('error',(err)=>{
    console.log("error connecting to the database");
});

db.on('disconnected',()=>{
    console.log("disconnected");
})

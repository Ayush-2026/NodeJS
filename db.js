const mongoose = require('mongoose')

const mongoURL = "mongodb://127.0.0.1:27017";

mongoose.connect(mongoURL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})

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

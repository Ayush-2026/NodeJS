const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = require('./db.js')
const mongoose = require('mongoose');



const personRoutes = require('./routes/personRoutes.js')
app.use('/person',personRoutes);

const menuItem_Routes=require('./routes/menuItem_Routes.js')
app.use('/menuItem',menuItem_Routes);






app.get('/',function(req,res){
    res.send('server connected');
})




app.listen(3000,()=>{
    console.log("listening on port 3000");
})
const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const person = require('./schema/person.js')

const date = new Date();


// Middleware
const logRequest = (req,res,next)=>{
    console.log(`${date.toLocaleTimeString()} Request made to : ${req.originalUrl}`);
    next(); // move on to the next phase
};

app.use(logRequest);

const db = require('./db.js')
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;






passport.use(new LocalStrategy(async (USERNAME, password, done)=>{   // 
    
    // authentication logic here
    try{
        // console.log('received credentials:', USERNAME,password);
        const user = await person.findOne({username:USERNAME});
        if(!user)
            return done(null, false,{message:'Incorrect username.'});
        
        const isPasswordmatch = await user.comparePassword(password);
        if(isPasswordmatch)
            return(done,user);
        else{
            return done(null,false,{message:'Incorrect password.'});
        }
    }
    catch(error){
        return done(error);
    }
}))


  
app.use(passport.initialize()); 




const localAuthMiddleware = passport.authenticate('local',{session:false})
app.get('/',localAuthMiddleware,function(req,res){
    res.send('Welcome to our hotel');
})

const personRoutes = require('./routes/personRoutes.js')
app.use('/person',localAuthMiddleware,personRoutes);

const menuItem_Routes=require('./routes/menuItem_Routes.js')
app.use('/menuItem',localAuthMiddleware,menuItem_Routes);

app.listen(PORT,()=>{
    console.log("listening on port 3000");
})
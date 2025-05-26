const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
 
    name:{
    type:String,
    required:true,
    },
    work:{
        type:String,
        workType:['waiter','manager','chef'],
        required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

personSchema.pre('save',async function(next){
    const person = this;

    //Hash the password only if it has been modified (or is new)

    if(!person.isModified('password')) return next();   
    try{
        // Hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);

        //override the plain password wiht the hashed one
        person.password = hashedPassword;
        next();
    }
    catch(error){
        return next(error);
    }
})


personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(error){ 
        throw error;
    }
}


module.exports = mongoose.model('person',personSchema);

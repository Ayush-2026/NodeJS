const mongoose= require('mongoose');

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
    }
})


module.exports = mongoose.model('person',personSchema);
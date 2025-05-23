const mongoose = require('mongoose');


const menuItemSchema = new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    type:{
        type:String,
        item_type:['starter','main course','dessert'],
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        required:true
    },
    sales:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('menuItem',menuItemSchema);
const express = require('express');
const router = express.Router();

const menuItem = require('./../schema/menuItem.js');

router.get('/',async function(req,res){
    const response = await menuItem.find();
    console.log("data fetched successfully");
    res.status(200).json(response);

})

module.exports = router;

router.get('/:item_type', async (req,res)=>{
    try{
        const item_type=req.params.item_type;
        if(item_type == 'starter' || item_type == 'main course' || item_type == 'desert'){
           
        const new_menuItem = await menuItem.find({type:item_type});
            console.log("response fetched successfully");
            res.status(200).json(new_menuItem);
        }
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({"Internal server error":error});
        }
    
})

router.post('/',async function(req,res){
    try{
        const data = req.body;
        const newItem =new menuItem(data);
        const response = await newItem.save();
        res.status(201).json(response);
    }
    catch(error){
        console.log(error);
        res.status(200).json({error:"internal server error"});
    }
})

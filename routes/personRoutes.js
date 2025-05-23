const express = require('express');
const router = express.Router();
const person = require('./../schema/person.js')

//post route to add a person
router.post('/',async function(req,res){
    try{
        const data = req.body;
    const newUser = new person(data);
    const response = await newUser.save();
    console.log("data saved successfully");
    res.status(201).json(response);
    }
    catch(error){
        console.log(error);
        res.status(200).json({error:"internal server error"});
    }

})

router.get('/',async function(req,res){
    const data = await person.find();
    console.log("data fetched");
    res.status(200).json(data);
})

router.delete('/',async function(req,res){
    const data = await person.deleteOne();
    console.log("1 entry deleted");
    res.status(201).json(data);
})

router.get('/:workType',async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response = await person.find({work:workType});
            console.log("response fetched")
            res.status(200).json({"data fetched successfully":response});
        }
        else{
            res.status(404).json({error:'invalid work type'});
        }
    }
    catch(err){
        console.log(error);
        res.status(200).json({error:"internal server error"});
    }
})


router.put('/:uski_id',async(req,res)=>{
    try{
        const personId = req.params.uski_id;
        const updatedPersonData = req.body;

        const response = await person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, // return the updated document
            runValidators:true, // run mongoose validation (all the required true fields in the person.js file)
        })

        if(!response){
            return res.status(404).json({error:"person not found"});
        }

        console.log("data updated");
        res.status(200).json(response);

    }
    catch(error){
        console.log(error);
        res.status(200).json({error:"internal server error"});
    }
})


module.exports=router;
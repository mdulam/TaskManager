const express = require("express");
const router = express.Router();
const task = require("../model/task.js");
const { check, validationResult } = require('express-validator');

router.get("/", (req,res)=>{

    task.find().exec().then(tasks =>{
        const taskList=tasks;      
        res.render('viewTask',{taskList:tasks});
    });
    
});




router.post("/",[
    check('name').trim().not().isEmpty().withMessage('Name should not be empty'),
    check('type').trim().not().isEmpty().withMessage('Select type of task'),
    check('date').trim().not().isEmpty().withMessage('Select a date').custom((value,{req})=>{
        const currentDate = new Date().toJSON().split('T')[0];
     const enteredValue = req.body.date;
     const valueEntered= enteredValue.split('T')[0];
     if(valueEntered <= currentDate)
     {
       throw new Error('date should be after current date');
     }
     return true;


    })
], (req, res, next) => {
    //console.log(req.body.name);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        const errorsArray = errors.array();
        console.log(errorsArray);
        return res.render('createTask',{errors: errorsArray});
    }
    if(req.body){
        const taskObject = new task({
            name: req.body.name,
            type: req.body.type,
            date: req.body.date,
            details: req.body.details
          });
      
          taskObject.save().then(result => {
              res.body=req.body;
          res.redirect("/task");
          });
    }
    else{
        res.render('createTask',{errors:null});
    }

    
});



module.exports=router;
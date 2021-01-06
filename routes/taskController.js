const express = require("express");
const router = express.Router();
const task = require("../model/task.js");

router.get("/", (req,res,next)=>{
    res.render('viewTask');
});



router.post("/", (req, res, next) => {
    console.log(req.body.name);

    const taskObject = new task({
      name: req.body.name,
      type: req.body.type,
      date: req.body.date,
      details: req.body.details
    });

    taskObject.save().then(result => {
    console.log(result);
    res.render("viewTask");
    });
});



module.exports=router;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const taskRoute = require("./routes/taskController.js");
const mongoose = require("mongoose");
const task = require("./model/task");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.use('/partials', express.static('partials'));

mongoose.connect(
    "mongodb+srv://meghanareddy1506:meghana*1506@clustertask.yjvls.mongodb.net/TaskManager?retryWrites=true&w=majority",

      {
         useNewUrlParser: true,useUnifiedTopology:true 
      }
  );
  mongoose.Promise = global.Promise;
  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  
app.get("/", (req, res)=>{
    res.render('index');
});

app.get("/createTask", (req, res)=>{
    res.render('createTask',{errors:null});
});

app.post("/search",(req,res)=>{
    if(req.body.name){
        task.find({name:req.body.name}).exec().then(searchTask =>{
            res.render('viewTask', {taskList:searchTask});
        });
    }
    else{
        task.find({}).exec().then(searchTask =>{
            res.render('viewTask', {taskList:searchTask});
        });
    }
    
});
app.use("/task", taskRoute);

db.once("open", function(){
    app.listen(3000, function(){
      console.log('Yola! Listening to port 3000');
    });

  });
  
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  
  

  
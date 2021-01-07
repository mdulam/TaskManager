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


 
function connect(){
    return new Promise((resolve, reject)=>{
        mongoose.connect(
            "mongodb+srv://meghanareddy1506:meghana*1506@clustertask.yjvls.mongodb.net/TaskManager?retryWrites=true&w=majority",
        
              {
                 useNewUrlParser: true,useUnifiedTopology:true 
              }
          ).then((res,err)=>{
              if(err) return reject(err);
              resolve();
          })
    });
}
mongoose.Promise = global.Promise;

function close(){
    return mongoose.disconnect();
}

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
  
  //connect();
  
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

  
  var server = app.listen(3000, function(){
    connect().then(()=>{
        console.log('App listening at'+3000);
    })  
  });
  

  module.exports=server;

  
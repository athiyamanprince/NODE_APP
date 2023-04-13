const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const Sequelize = require("sequelize");
const sequelize = new Sequelize("sequelize_test","root","root@12",{
    dialect: "mariadb",
    host: "localhost",
    // logging: false
});

const Task = sequelize.define("task",{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
});



app.listen(4000,()=>{
    console.log("server listening on port 4000");
});

// get all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});


// create new task
app.get("/tasks/create/:name", async (req, res) => {
    const taskName = req.params.name;
    const task = await Task.create({name:taskName});
    res.json(task);
});

// get task by id
app.get("/tasks/:id", async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if(task){
        res.json(task);
    }else{
        res.status(404).send('<h1 style ="text-align:center">Task Not found - Error 404</h1>');
    }
});

// update task by id
app.get("/tasks/update/:id/:name", async (req, res) => {
    const taskId = req.params.id;
    const taskName = req.params.name;
    const task = await Task.findByPk(taskId);
    if(task){
        task.name = taskName;
        await task.save();
        res.json(task);
    } else{
        res.status(404).send('Task not found - Error 404');
    }
});

// delete task by id
app.get("/tasks/delete/:id", async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if(task){
        await task.destroy();
        res.send('Task Deleted')
    }else{
        res.status(404).send('Task Not Found - Error 404 ')
    }
});

app.post("/postFormData",  async (req, res) => {
    console.log("req.body---------------------",req.body)
        res.send('Task has been created');
});
sequelize.sync({alter:true});

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require("cors");


// const app = express();
// const port = process.env.PORT || 4000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.post('/postFormData', (req, res) => {
//   console.log("req.body----------------", req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));
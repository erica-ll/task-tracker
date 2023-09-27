const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'TodoListDatabase',
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.get('/api/get', (req, res)=>{
    const sqlInsert = "SELECT * FROM tasks";
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    });
})

app.post('/api/insert', (req, res)=>{
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const time = req.body.time;
    console.log(taskName)
    console.log(taskDescription)
    console.log(time)
    const sqlInsert = "INSERT INTO tasks (taskName, taskDescription, time) VALUES (?,?,?)"
    db.query(sqlInsert, [taskName, taskDescription,time], (err,result)=>{
        console.log(result.insertId);
        res.sendStatus(result.insertId);
    });
});

app.delete('/api/delete/:key', (req, res)=>{
    console.log(req.params.key);
    const id = req.params.key;
    const sqlDelete = "DELETE FROM tasks WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if(err) console.log(err);
    });
})

app.put('/api/update', (req, res)=>{
    const id = req.body.id;
    const name = req.body.taskName;
    const description = req.body.taskDescription;
    const sqlUpdate = "UPDATE tasks SET taskName = ?, taskDescription = ? WHERE id = ?";
    db.query(sqlUpdate, [name, description, id], (err, result) => {
        if(err) console.log(err);
    });
})

app.put('/api/setTime', (req, res)=>{
    const id = req.body.id;
    const time = req.body.time;
    console.log(time)
    const sqlUpdate = "UPDATE tasks SET time = ? WHERE id = ?";
    db.query(sqlUpdate, [time, id], (err, result) => {
        if(err) console.log(err);
    });
})

app.get('/api/getTime/:id', (req, res)=>{
    const id = req.params.id;
    console.log(id)
    const sqlInsert = "SELECT time FROM tasks WHERE id = ?";
    db.query(sqlInsert, id, (err, result) => {
        res.send(result);
    });
})


app.listen(3001, ()=>{
    console.log("running on port 3001");
});

// Handling the completed tasks
app.post('/api/completed/insert', (req, res)=>{
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const time = req.body.time;
    const sqlInsert = "INSERT INTO completed (taskName, taskDescription, time) VALUES (?,?,?)"
    db.query(sqlInsert, [taskName, taskDescription, time],(err,result)=>{
        //if(err) console.log(err);
        //console.log(result.insertId);
        res.send({value:result.insertId});
    });
        
});

app.get('/api/completed/get', (req, res)=>{
    const sqlInsert = "SELECT * FROM completed";
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    });
})

app.delete('/api/completed/delete/:key', (req, res)=>{
    console.log(req.params.key);
    const id = req.params.key;
    //console.log(id);
    const sqlDelete = "DELETE FROM completed WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        //if(err) console.log(err);
    });
})
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const db = require('./db');

const server = express();

server.use(express.json());
server.use(morgan());
server.use(helmet());

const collection = "todo";

server.get('/todos', (req, res) => {
  db.getDB().collection(collection).find().toArray((err, documents) => {
    if(err) {
      console.log(err)
    } else {
      console.log(documents);
      res.status(200).json(documents);
    }
  })
})

server.put('/todos/:id', (req, res) => {
  const todoID = db.getPrimaryKey(todoID);

  db.getDB().collection(collection).findOneAndUpdate({_id: todoID}, {$set: {todo: req.body.todo}}, {returnOriginal: false}, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  })
})

server.delete('/todos/:id', (req, res) => {
  const todoID = db.getPrimaryKey(req.params.id);
  db.getDB().collection(collection).findOneAndDelete({_id: todoID}, (err, result) => {
    if(err) {
      console.log(err)
    } else {
      res.status(200).json(result)
    }
  })
})

server.post('/todos', (req, res) => {
  db.getDB().collection(collection).insertOne(req.body, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.status(201).json(result);
    }
  })
})

db.connect(err => {
  if(err) {
    console.log('unable to connect to database');
    process.exit(1);
  } else {
    server.listen(8000, _ => {
      console.log('connected to database, app listening on port 3000');
    })
  }
})
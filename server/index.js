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
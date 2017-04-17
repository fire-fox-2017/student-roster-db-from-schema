"use strict"

const repl = require('repl');
const sq = require('sqlite3');
const sqlite = sq.verbose();
let replWords = repl.start({prompt: '> '});
var file = 'data.db';
var db = new sqlite.Database(file);

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, birthdate DATE);";
var SEED_DATA = "INSERT INTO student (first_name, last_name, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31')";
// write your code here
let createTable = () => {
  // Run SQl one at a time
  db.serialize(function() {
    //create TABLE
    db.run(CREATE_TABLE, function(err){
      if (!err){
        console.log(`Data is created`);
      }else {
        console.log(err.message);
      }
    });
  });
}

replWords.context.createTable = createTable;

let seedData = () => {
  db.serialize(function() {
    db.run(SEED_DATA, function(err){
      if (!err){
        console.log(`seed data sucess`);
      }else {
        console.log(err.message);
      }
    });
  });
}

replWords.context.seedData = seedData;

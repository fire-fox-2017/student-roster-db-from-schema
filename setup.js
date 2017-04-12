"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);


// SQL Statement
var Create_table = "CREATE TABLE IF NOT EXISTS students ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, birthdate DATE);";
var SEED_DATA = "INSERT INTO students (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31')";

// CREATE_TABLE
let createTable = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // create table
    db.run(Create_table, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Table students created');
      }
    });
  });
}

// SEED_DATA
let seedData = () => {
  db.serialize(function() {
    db.run(SEED_DATA, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('successfully seed data to table students');
      }
    });
  });
}

var replServer = repl.start('> ');

replServer.context.createTable = createTable;
replServer.context.seeddata = seedData;

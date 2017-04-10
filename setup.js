"use strict"

//write your code here
"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
// const sqlite = require('sqlite');

var file = 'student.db';
var db = new sqlite.Database(file);

//SQL statement
var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS Students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE );";

var SEED_DATA = "INSERT INTO Students (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";

let createTable = () => {
  // Run SQL one at a time
  db.serialize(function () {
    db.run(CREATE_TABLE, function (err) {
      if (err) {
        console.log(err);
      }else {
        console.log('CREATE TABLE');
      }
    });
  });
}

let seedData = () => {
  db.serialize(function () {
    db.run(SEED_DATA, function (err) {
      if (err) {
        console.log(err);
      }else {
        console.log('SEED DATA');
      }
    });
  });
}

// start REPL
const replServer = repl.start({prompt: '>  '});

replServer.context.createTable = createTable;
replServer.context.seedData = seedData;




// createTable();

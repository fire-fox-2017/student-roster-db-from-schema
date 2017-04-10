"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
//write your code here

var file = 'student.db';
var db = new sqlite.Database(file);

let replServer = repl.start({prompt: '> '});

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE);";
var SEED_DATA = "INSERT INTO students (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";

let createTable = () => {
    db.serialize(function() {
        db.run(CREATE_TABLE, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('CREATE TABLE');
            }
        });
    });
}



let seedData = () =>{
  db.serialize(function() {
      db.run(SEED_DATA, function(err) {
          if (err) {
              console.log(err);
          } else {
              console.log('SEED DATA');
          }
      });
  });
}

replServer.context.create = createTable
replServer.context.seed = seedData

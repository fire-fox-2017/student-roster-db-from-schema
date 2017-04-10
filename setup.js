"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

//write your code here
let replServer = repl.start({prompt: '> '});

let file = 'student.db';
let db = new sqlite.Database(file);

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birth_date TEXT)";
let SEED_DATA = "INSERT INTO students (firstname, lastname, birth_date) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";

let createTable = () => {
  db.serialize(() => {
    db.run(CREATE_TABLE, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    })
  });
}

let seedData = (firstname, lastname, birth_date) => {
  db.serialize(() => {
    db.run(`INSERT INTO students (firstname, lastname, birth_date) VALUES ('${firstname}', '${lastname}', '${birth_date}')`, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`Data has been succesfully appended.`);
      }
    });
  });
}


replServer.context.createTable = createTable;
replServer.context.seedData = seedData;

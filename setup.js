"use strict"
const repl = require('repl')
const sqlite3 = require('sqlite3').verbose();

var db_student = new sqlite3.Database('student.db');
const replServer = repl.start({prompt : '> '});

//write your code here
var create_table = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT , last_name TEXT, birth_date DATE)";
var seed_data = `INSERT INTO students (first_name,last_name,birth_date) VALUES ('Ruby','Sanjaya','1986-11-20'),('Riza','Fahmi','1983-12-31')`;
let createTable = () => {
  db_student.serialize(() => {
    db_student.run(create_table,(err) => {
      if (err){
        console.log(err);
      }else{
        console.log("Create Table Success");
      }
    });
  });
}

let seedData = () => {
  db_student.serialize(()=>{
    db_student.run(seed_data,(err)=>{
      if(!err){
        console.log('Insert Success');
      }else{
        console.log(err);
      }
    })
  })
}
replServer.context.createTable = createTable;
replServer.context.seedData = seedData;

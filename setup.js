"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
var file = 'student.db';
var db = new sqlite.Database(file);

const r=repl.start('$ ');

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";
var SEED_DATA = "INSERT INTO student (firstname,lastname,birthdate) VALUES ('Rubi','Henjaya','1986-11-20'),('Riza','Fahmi','1983-12-31');";

// CREATE_TABLE
let createTable = () => {
  db.serialize(function(){
    //create table
    db.run(CREATE_TABLE, function(err){
      if(err){
        console.log(err);
      }else{
        console.log('CREATE TABLE');
      }
    });
  });
}

//SEED_DATA
let seedData = () => {
//Your code here
db.serialize(function(){
  //create table
  db.run(SEED_DATA, function(err){
    if(err){
      console.log(err);
    }else{
      console.log('SEED TABLE');
    }
  });
});
}

r.context.createTable = createTable;
r.context.seedData = seedData;

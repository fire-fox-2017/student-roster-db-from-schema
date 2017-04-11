"use strict"

//write your code here
const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let replServer = repl.start({prompt : '> '});
var file = 'student.db';
var db = new sqlite3.Database(file);


var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, birthdate DATE)";
var SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31')";


let createTable = () =>{

  db.serialize(function(){

    db.run(CREATE_TABLE, function(err){
      if(err){
        console.log(err);
      }else{
        console.log('CREATE TABLE')
      }
    });
  });
}


let seedData = () =>{
  db.serialize(function(){

    db.run(SEED_DATA, function(err){
      if(err){
        console.log(err);
      }else{
        console.log('SEED_DATA')
      }
    });
  });
}
replServer.context.createTable = createTable;
replServer.context.seedData = seedData;

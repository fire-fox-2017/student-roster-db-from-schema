"use strict"

//write your code here
const repl = require('repl')
const sqlite3 = require('sqlite3').verbose()

let file = 'student.db'
let db = new sqlite3.Database(file)

//SQL statement
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE )"

let SEED_DATA = "INSERT INTO student (firstname,lastname,birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza','Fahmi','1983-12-31')"

//create TABLE
let createTable = () => {
  // run SQL one at time
  db.serialize(() => {
    //create TABLE
    db.run(CREATE_TABLE, (err) => {
      if (!err) {
        console.log('CREATE TABLE')
      } else (
        console.log(err.message)
      )
    })
  })
}

//seed data
let seedData = () => {
//your code here
  db.serialize(() => {
    //create TABLE
    db.run(SEED_DATA, (err) => {
      if (!err) {
        console.log('SEED DATA')
      } else (
        console.log(err.message)
      )
    })
  })
}

let replServer = repl.start({prompt: "> "})
replServer.context.createTable = createTable
replServer.context.seedData = seedData

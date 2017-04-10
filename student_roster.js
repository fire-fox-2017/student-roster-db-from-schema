"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
class Student {
  constructor () {

  }

  addStudent(firstname, lastname, birthdate) {
    let query = `INSERT INTO Students(firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`;

  }


  runQuery(query) {
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('QUERY Ran Successfully!');
        }
      });
    });

  }



}

"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);


// write your code here
class Student {
  constructor () {
    // this.file = 'student.db';
    // this.db = new sqlite.Database(this.file);
  }

  addStudent(firstname, lastname, birthdate) {
    let query = `INSERT INTO Students(firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`;
    this.runQuery(query);
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


// pake repl??

let student = new Student();

student.addStudent("David", "Johnson", "1992-1-1");

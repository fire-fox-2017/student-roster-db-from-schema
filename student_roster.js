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

  addStudent(firstname, lastname, birthdate) {
    let query = `INSERT INTO Students(firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`;
    this.runQuery(query);
  }

  updateStudentData(id, new_firstname, new_lastname, new_birthdate) {
    let query =
      `UPDATE students SET firstname = '${new_firstname}', lastname = '${new_lastname}', birthdate = '${new_birthdate}' WHERE id = ${id}`;

    this.runQuery(query);
  }

  deleteStudent(id) {
    let query = `DELETE FROM students WHERE id = ${id}`;
    this.runQuery(query);
  }

} // end of Student Class


// pake repl??

let student = new Student();

// student.addStudent("David", "Johnson", "1992-1-1");
// student.addStudent("Big", "Ben", "1984-1-1");

// student.updateStudentData(6, 'Ben', 'Roth', '1985-1-1');

student.deleteStudent(8);

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

  listStudents() {
    let query = `SELECT * FROM Students`;
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      })
    });
  }

  listStudentsByName(search_name) {
    let query = `SELECT * FROM Students where firstname like '%${search_name}%' OR lastname like '%${search_name}%'`;
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      })
    });
  }

  listStudentsBirthday() {
    let query = `SELECT * FROM Students where to_char(birthdate, 'MM') = '01'`;
  }

  runQuerySelect(query) {
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      })
    });
  }



} // end of Student Class


// pake repl??

let student = new Student();

// student.addStudent("David", "Johnson", "1992-1-1");
// student.addStudent("Brandin", "Cooks", "1984-04-10");

// student.updateStudentData(6, 'Ben', 'Roth', '1985-1-1');

// student.deleteStudent(9);
// student.listStudents();
// console.log("----")
student.listStudentsByName("Ben");

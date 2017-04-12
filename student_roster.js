"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);


// write your code here

class Student {
  constructor() {

  }

  static add(firstname, lastname, birthdate) {
    // ADD_DATA('firstname', 'lastname', 'birthdate')
    let ADD_DATA = `INSERT INTO students (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`;
    db.serialize(function() {
      db.run(ADD_DATA, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('berhasil menambah data');
        }
      });
    });

  }

  static update(property_name, new_value, id) {
    // UPDATE students SET firstname = 'Uli' WHERE id = 1;
    let UPDATE_DATA = `UPDATE students SET '${property_name}' = '${new_value}' WHERE id = ${id}`;
    db.serialize(function() {
      db.run(UPDATE_DATA, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log(`berhasil mengubah menjadi '${new_value}'`);
        }
      });
    });
  }

  static delete(id) {
    // `DELETE FROM students WHERE id = '${id}'`;
    let DELETE_DATA = `DELETE FROM students WHERE id = '${id}'`;
    db.serialize(function() {
      db.run(DELETE_DATA, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('berhasil menghapus data');
        }
      });
    });
  }

  static viewAll() {
    // SELECT * FROM students;
    let VIEW_ALL = `SELECT * FROM students`;
    db.serialize(function() {
      db.all(VIEW_ALL, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          data.forEach((value) => {
            console.log(`${value.id} | ${value.firstname} | ${value.lastname} | ${value.birthdate}`);
          });
        }
      });
    });
  }

  static viewStudentWithName(like) {
    // SELECT * FROM students WHERE name LIKE '${like}%';
    let VIEW_WITH_NAME = `SELECT * FROM students WHERE firstname LIKE '%${like}%' OR lastname LIKE '%${like}%'`;
    db.serialize(function() {
      db.all(VIEW_WITH_NAME, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    });

  }

  static viewStudentWithAttr(property, value) {
    // SELECT * FROM students WHERE ${property} = ${value};
    let VIEW_WITH_ATTR = `SELECT * FROM students WHERE ${property} = '${value}'`;
    db.serialize(function() {
      db.all(VIEW_WITH_ATTR, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          data.forEach(function(el) {
          console.log(`${el.id}|${el.firstname}|${el.lastname}|${el.birthdate}`);
         });
        }
      });
    });
  }

  static viewBirthdayThisMonth(month) {
    let VIEW_BIRTHDAY_MONTH = `SELECT * FROM students WHERE strftime('%m', birthdate) = '${month}'`;
    db.serialize(function() {
      db.all(VIEW_BIRTHDAY_MONTH, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          data.forEach(function(el) {
          console.log(`${el.id}|${el.firstname}|${el.lastname}|${el.birthdate}`);
         });
        }
      });
    });

  }

  static sortingBirthday() {
  // berurutan januari - desember
    let SORTING_BIRTHDAY = `SELECT * FROM students ORDER BY strftime('%m', birthdate)`;
    db.serialize(function() {
      db.all(SORTING_BIRTHDAY, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          data.forEach(function(el) {
          console.log(`${el.id}|${el.firstname}|${el.lastname}|${el.birthdate}`);
         });
        }
      });
    });
  }

  static help() {
  //list command:
  console.log(`===HELP COMMAND===\nadd new student: Student.add('firstname', 'lastname', 'birthdate'); //yyyy-mm-dd\nupdate student profile: Student.update('property_to_change', 'new_value', id_source);\ndelete student profile: Student.delete(id_to_delete);\nview all student: Student.viewAll();\nview student that has name: Student.viewStudentWithName(name_to_search);\nview student that has attribute: Student.viewStudentWithAttr(property_to_search, value_in_the_property);\nview student that has birthday this month: Student.viewBirthdayThisMonth('month_in_number'. example:'02');\nsorting student birthday from 01 to 12: Student.sortingBirthday()`)
  }

}

const replServer = repl.start('> ');

Student.help();
replServer.context.Student = Student;

"use strict"

const repl = require('repl');
let replServer = repl.start({prompt: `> `});
const sqlite = require('sqlite3').verbose();

class Students {
  constructor () {
    //this.file = `student.db`;
    //this.db = new sqlite.Database(this.file);
    this.query = ``;
  }

  // createTable () {
  //   let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS students ( id INTEGER PRIMARY KEY
  //     AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE);`;
  //   let db = new sqlite.Database(`student.db`);
  //   db.serialize(function () {
  //     db.run(CREATE_TABLE, (err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('Create table succeed');
  //       }
  //     });
  //   });
  // }

  insertStudent (firstname, lastname, birthdate) {
    if (firstname && lastname && birthdate) {
      let INSERT_STUDENT = `INSERT INTO students (firstname, lastname, birthdate)
      VALUES('${firstname}', '${lastname}', '${birthdate}');`;
      let db = new sqlite.Database(`student.db`);
      db.serialize(function () {
        db.run(INSERT_STUDENT, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Insert student succeed');
          }
        });
      });
    } else {
      console.log('The argument is not complete');
    }
  }

  // updateStudent (id, argument) {
  //   let UPDATE_STUDENT = `UPDATE students SET `;
  //   let object = JSON.parse(argument);
  //   for (var property in object) {
  //     UPDATE_STUDENT += `'${property}' = '${object.property}', `;
  //   }
  //   UPDATE_STUDENT += `WHERE id = ${id};`;
  //   let db = new sqlite.Database(`student.db`);
  //   db.serialize(function () {
  //     db.run(UPDATE_STUDENT, (err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('Update student succeed');
  //       }
  //     });
  //   });
  // }

  updateStudent (id, firstname, lastname, birthdate) {
    let UPDATE_STUDENT = `UPDATE students SET firstname = '${firstname}',
    lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = ${id}`;
    let db = new sqlite.Database(`student.db`);
    db.serialize(function () {
      db.run(UPDATE_STUDENT, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Update student succeed');
        }
      });
    });
  }

  deleteStudent (id) {
    let DELETE_STUDENT = `DELETE FROM students WHERE id = ${id};`;
    let db = new sqlite.Database(`student.db`);
    db.serialize(function () {
      db.run(DELETE_STUDENT, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Delete student succeed');
        }
      });
    });
  }

  showAll () {
    let SHOW_ALL = `SELECT * FROM students;`;
    let db = new sqlite.Database(`student.db`);
    db.serialize(function () {
      db.each(SHOW_ALL, (err, row) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birthdate}`);
        }
      });
    });
  }

  // showStudent (firstname, lastname) {
  //   let SHOW_STUDENT = `SELECT * FROM students `;
  //   if (firstname != undefined) {
  //     SHOW_STUDENT += `WHERE firstname = '${firstname}' `
  //   }
  //   if (lastname != undefined) {
  //     SHOW_STUDENT += `AND lastname = '${lastname}' `
  //   }
  //   SHOW_STUDENT += `;`;
  //   console.log(SHOW_STUDENT);
  //   let db = new sqlite.Database(`student.db`);
  //   db.serialize(function () {
  //     db.each(SHOW_STUDENT, (err, row) => {
  //       console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birthdate}`);
  //     });
  //   });
  // }

  showStudent (name) {
    let SHOW_STUDENT = `SELECT * FROM students WHERE firstname LIKE '%${name}%'
    OR lastname LIKE '%${name}%'`;
    let db = new sqlite.Database(`student.db`);
    db.serialize(function () {
      db.each(SHOW_STUDENT, (err, row) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birthdate}`);
        }
      });
    });
  }

  showStudentAttr (params, value) {
    let SHOW_STUDENT_ATTR = `SELECT * FROM students WHERE ${params} = '${value}';`;
    let db = new sqlite.Database(`student.db`);
    db.serialize(function () {
      db.each(SHOW_STUDENT_ATTR, (err, row) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birthdate}`);
        }
      });
    });
  }

  showBirthdayThisMonth () {
    let SHOW_BIRTHDAY = `SELECT * FROM students WHERE strftime('%m', birthdate)
    = strftime('%m', 'now');`;
    let db = new sqlite.Database(`student.db`);
    db.serialize(function () {
      db.each(SHOW_BIRTHDAY, (err, row) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birthdate}`);
        }
      });
    });
  }

  showSortedBirthday () {
    let SHOW_SORTED_BIRTHDAY = `SELECT * FROM students ORDER BY strftime('%m',
    birthdate), strftime('%d', birthdate);`;
    let db = new sqlite.Database(`student.db`);
    db.serialize(function () {
      db.each(SHOW_SORTED_BIRTHDAY, (err, row) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birthdate}`);
        }
      });
    });
  }

  printHelp() {
    console.log(
      `>>>>>>>>>> Command Help <<<<<<<<<<
      1. Insert Student                 : insertStudent(firstname, lastname, birthdate)
      2. Update Student                 : updateStudent(id, firstname, lastname, birthdate)
      3. Delete Student                 : deleteStudent(id)
      4. Show All Students              : showAll()
      5. Show Students by Name          : showStudent(name)
      6. Show Students by Attribute     : showStudentAttr(attribute, value)
      7. Show Students that have birthdays this month: showBirthdayThisMonth()
      8. Show Students by Sorted Month  : showSortedBirthday()
      9. Help                           : help()
      `
    );
  }
}


let students = new Students();

replServer.context.insertStudent = students.insertStudent;
replServer.context.updateStudent = students.updateStudent;
replServer.context.deleteStudent = students.deleteStudent;
replServer.context.showAll = students.showAll;
replServer.context.showStudent = students.showStudent;
replServer.context.showStudentAttr = students.showStudentAttr;
replServer.context.showBirthdayThisMonth = students.showBirthdayThisMonth;
replServer.context.showSortedBirthday = students.showSortedBirthday;
replServer.context.help = students.printHelp;

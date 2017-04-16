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
          console.log(`${JSON.stringify(row)}`);
        }
      });
    });
  }

  showStudent (name) {
    let SHOW_STUDENT = `SELECT * FROM students WHERE firstname LIKE '%${name}%'
    OR lastname LIKE '%${name}%'`;
    let db = new sqlite.Database(`student.db`);
    db.serialize(function () {
      db.each(SHOW_STUDENT, (err, row) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${JSON.stringify(row)}`);
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
          console.log(`${JSON.stringify(row)}`);
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
          console.log(`${JSON.stringify(row)}`);
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
          console.log(`${JSON.stringify(row)}`);
        }
      });
    });
  }

  printHelp() {
    console.log(
      `1. insertStudent(firstname, lastname, birthdate)\n2. updateStudent(id, firstname, lastname, birthdate)\n3. deleteStudent(id)\n4. showAll()\n5. showStudent(name)\n6. showStudentAttr(attribute, value)\n7. showBirthdayThisMonth()\n8. showSortedBirthday()\n9. help()`
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

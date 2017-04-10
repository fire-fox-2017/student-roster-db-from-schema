"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

//write your code here
// let replServer = repl.start({prompt: '> '});

let file = 'student.db';
let db = new sqlite.Database(file);


class Student {
  constructor() {
    this.replServer = repl.start({prompt: '> '});
    this.replServer.context.createTable = this.createTable;
    this.replServer.context.showData = this.showData;
    this.replServer.context.addStudent = this.addStudent;
    this.replServer.context.deleteStudent = this.deleteStudent;
    this.replServer.context.update = this.update;
    this.replServer.context.filterName = this.filterName;
    this.replServer.context.filter = this.filter;
    this.replServer.context.bdayThisMonth = this.bdayThisMonth;
    this.replServer.context.sortBday = this.sortBday;
    this.replServer.context.help = this.help;
  }

  createTable() {
    let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birth_date TEXT)"`;
    db.serialize(() => {
      db.run(CREATE_TABLE, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log('CREATE TABLE');
        }
      });
    });
  }

  showData() {
    db.serialize(() => {
      db.all("SELECT * FROM students", (err, rows) => {
        if(err) {
          console.log(err);
        }else {
          console.log(`\nid|firstname|lastname|birth_date`);
          rows.forEach((row) => {
            console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birth_date}`);
          });
         }
      });
    });
  }

  addStudent(firstname, lastname, birth_date) {
    db.serialize(() => {
      db.run(`INSERT INTO students (firstname, lastname, birth_date) VALUES ('${firstname}', '${lastname}', '${birth_date}')`, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log(`Student has been succesfully appended.`);
        }
      });
    });
  }

  deleteStudent(id) {
    db.serialize(() => {
      db.run(`DELETE FROM students WHERE id = '${id}'`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Student has been successfully removed.`);
        }
      });
    });
  }

  update(id, column, newValue) {
    db.serialize(() => {
      db.run(`UPDATE students SET '${column}' = '${newValue}' WHERE id = '${id}'`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Student's data has been successfully updated.`);
        }
      });
    });
  }

  filterName(name) {
    db.serialize(() => {
      db.all(`SELECT * FROM students WHERE firstname LIKE '%${name}%' OR lastname LIKE '%${name}%'`,(err, rows) => {
        if(err) {
          console.log(err);
        } else {
          console.log(`\nid|firstname|lastname|birth_date`);
          rows.forEach((row) => {
            console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birth_date}`);
          });
        }
      });
    });
  }

  filter(column, name) {
    let query = `SELECT * FROM students WHERE ${column} = '${name}'`;
    db.serialize(() => {
      db.all(query,(err, rows) => {
        if(err) {
          console.log(err);
        } else {
          console.log(`\nid|firstname|lastname|birth_date`);
          rows.forEach((row) => {
            console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birth_date}`);
          });
        }
      });
    });
  }

  bdayThisMonth() {
    let query = `SELECT * FROM students WHERE strftime('%m', birth_date) = strftime('%m', 'now')`;
    db.serialize(() => {
      db.all(query,(err, rows) => {
        if(err) {
          console.log(err);
        } else {
          console.log(`\nid|firstname|lastname|birth_date`);
          rows.forEach((row) => {
            console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birth_date}`);
          });
        }
      });
    });
  }

  sortBday() {
    let query = `SELECT * FROM students order by strftime('%m', birth_date), strftime('%d', birth_date) asc`;
    db.serialize(() => {
      db.all(query,(err, rows) => {
        if(err) {
          console.log(err);
        } else {
          console.log(`\nid|firstname|lastname|birth_date`);
          rows.forEach((row) => {
            console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birth_date}`);
          });
        }
      });
    });
  }

  help() {
    let help = ['-- COMMAND LIST --',
                'showData()                                     to show all students',
                'addStudent(firstname, lastname, birth_date)    to add student to the table',
                'deleteStudent(id)                              to delete student',
                'update(id, column, newValue)                   to update student data',
                'filterName(name)                               to find students by name',
                'filter(column, name)                           to find students by any attribute',
                'bdayThisMonth()                                to show students having birthday this month',
                'sortBday()                                     to sort student ascendingly based on birthday'];
    for (let i = 0; i < help.length; i++) {
      console.log(help[i]);
    }
  }






}





let student = new Student();

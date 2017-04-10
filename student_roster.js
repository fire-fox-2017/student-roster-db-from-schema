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
    var add_entry = `INSERT INTO student ('firstname', 'lastname', 'birthdate') VALUES ("${firstname}", "${lastname}", "${birthdate}")`
    db.serialize(function() {
      db.run(add_entry, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('ADD STUDENT');
        }
      })
    })
  }

  static update(id, firstname, lastname, birthdate) {
    var update_entry = `UPDATE student SET firstname = "${firstname}", lastname = "${lastname}", birthdate = "${birthdate}" WHERE id="${id}"`
    db.serialize(function() {
      db.run(update_entry, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('UPDATE STUDENT');
        }
      })
    })
  }

  static delete(id) {
    var delete_entry = `DELETE FROM student WHERE id = "${id}"`
    db.serialize(function() {
      db.run(delete_entry, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('DELETE STUDENT');
        }
      })
    })
  }

  static displayAll() {
    var show_table = "SELECT * FROM student"
    db.serialize(function() {
      db.each(show_table, function(err, row) {
        console.log(`"${row.id}", "${row.firstname}", "${row.lastname}", "${row.birthdate}"`);
      })
    })
  }


  static displayStudent(name) {
    var display_student = `SELECT * FROM student WHERE UPPER(firstname) = '${name.toUpperCase()}' OR UPPER(lastname) = '${name.toUpperCase()}'`
    db.serialize(function() {
      db.each(display_student, function(err, row) {
        console.log(`"${row.id}", "${row.firstname}", "${row.lastname}", "${row.birthdate}"`);
      })
    })
  }

  static displayValue(attribute,value) {
    var display_value = `SELECT * FROM student WHERE ${attribute}='${value}'`
    console.log(display_value)
    db.serialize(function() {
      db.each(display_value, function(err, row) {
        console.log(`"${row.id}", "${row.firstname}", "${row.lastname}", "${row.birthdate}"`);
      })
    })
  }

  static sortBdayMonth() {
    var display_student = `SELECT * FROM student ORDER BY birthdate`
    var datetime = new Date();
    var thisMonth = datetime.getMonth();
    db.serialize(function() {
      db.each(display_student, function(err, row) {
        var date = new Date(row.birthdate);
        var month = date.getMonth();
        if (month == thisMonth) {
          console.log(`"${row.id}", "${row.firstname}", "${row.lastname}", "${row.birthdate}"`)
        }
      })
    })
  }

  static sortBday() {
    var display_student = `SELECT * FROM student ORDER BY (strftime('%m-%d', birthdate))`

    db.serialize(function() {
      db.each(display_student, function(err, row) {
        console.log(`"${row.id}", "${row.firstname}", "${row.lastname}", "${row.birthdate}"`)
      })
    })
  }


  static help() {
    console.log("1. Add Data: Student.add(firstname, lastname, birthdate)");
    console.log("2. Update Data: Student.update(id, firstname, lastname, birthdate)");
    console.log("3. Delete Data: Student.delete(id)");
    console.log("4. Display All Entry: Student.displayAll()");
    console.log("5. Display Entries by Student Name: Student.displayStudent(name)");
    console.log("6. Display Entries by Value: Student.displayValue(attribute,value)");
    console.log("7. Display Entries with Birthdays this Month: Student.sortBdayMonth()");
    console.log("8. Display Entries Sorted by Month: Student.sortBday()");
    console.log("9. Help : Student.help()")
  }
}

var initiate = repl.start('> ')

initiate.context.Student = Student

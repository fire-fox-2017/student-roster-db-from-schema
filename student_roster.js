"use strict"
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
// write your code here
let fileName = 'student.db'
let db = new sqlite.Database(fileName)

class Student {
  constructor() {}
  static addStudent(firstName, lastName, birthdate) {
    let query_add_student = "INSERT INTO student (first_name,last_name,birthdate) VALUES (?,?,?)"
    db.serialize(function() {
      db.run(query_add_student, [firstName, lastName, birthdate], function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('add new student data success');
        }
      })
    })
  }
  static showAll() {
    let show_query = `SELECT * FROM student`
    db.all(show_query, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }
  static deleteStudent(id) {
    let delete_query = `DELETE FROM student where id = ${id}`
    db.serialize(function() {
      db.run(delete_query, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`student with id : ${id} deleted`);
        }
      })
    })
  }
  static updateStudent(id, fieldName, newValue) {
    let update_query = `UPDATE student set ${fieldName} = "${newValue}" where id = (?)`
    db.serialize(function() {
      db.run(update_query, [id], function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`field name with id ${id}, was updated`);
        }
      })
    })
  }
  static showFilterByName(name) {
    let select_by_name = `SELECT * FROM student WHERE first_name= $first_name OR last_name= $last_name`
    db.each(select_by_name, {
      $first_name: name,
      $last_name: name
    }, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }
  static showFilterBySomething(fieldName, value) {
    let select_by_something = `SELECT * FROM student WHERE ${fieldName} = (?)`
    db.each(select_by_something, [value], function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }
  static thisMonthBirthday() {
    let select_this_month_birthday = `SELECT * FROM student WHERE strftime('%m',birthdate) = strftime('%m','now') `;
    db.each(select_this_month_birthday, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }
  static orderByBirthday() {
    let select_and_order_by_birthday = `SELECT * FROM student ORDER BY strftime('%m',date(birthdate)), strftime('%d',date(birthdate))`
    db.each(select_and_order_by_birthday, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }
  static help() {
    console.log("--------help menu--------");
    console.log('Show all student data : showAll()');
    console.log('Add student data : addStudent(firstname,lastname,birthdate)');
    console.log('Update student data : updateStudent(id,fieldName,newValue)');
    console.log('Delete student data : deleteStudent(id)');
    console.log('Show student filter by name  : showFilterByName(name)');
    console.log('Show student filter by something: showFilterBySomething(filedName, Value)');
    console.log('Show student birthday this month  : thisMonthBirthday()')
    console.log('Show student order by birthday  :  orderByBirthday()')
  }
}
let r = repl.start(' > ')
r.context.addStudent = Student.addStudent
r.context.deleteStudent = Student.deleteStudent
r.context.updateStudent = Student.updateStudent
r.context.showAll = Student.showAll
r.context.showFilterByName = Student.showFilterByName
r.context.showFilterBySomething = Student.showFilterBySomething
r.context.thisMonthBirthday = Student.thisMonthBirthday
r.context.orderByBirthday = Student.orderByBirthday
r.context.help = Student.help
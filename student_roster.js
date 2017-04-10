"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = 'student.db'
let db = new sqlite3.Database(file)
// write your code here
class Student{
  addStudent(firstname, lastname, birthdate) {
    let SEED_DATA = `INSERT INTO student (firstname,lastname,birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`
    db.serialize(() => {
      db.run(SEED_DATA, (err) => {
        if(!err) {
          console.log('data berhasil ditambahkan');
        } else {
          console.log(err.message);
        }
      })
    })
  }
  updateData_id(firstname, lastname, birthdate, id) {
    let UPADTE_DATA = `UPDATE student SET firstname = '${firstname}', lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = '${id}'`
    db.serialize(() => {
      db.run(UPADTE_DATA, (err) => {
        if(!err) {
          console.log('data berhasil diupdate');
        } else {
          console.log(err.message);
        }
      })
    })
  }
  deleteStudent(id) {
    let DELETE_STUDENT = `DELETE FROM student WHERE id = '${id}'`
    db.serialize(() => {
      db.run(DELETE_STUDENT, (err) => {
        if(!err) {
          console.log('data berhasil dihapus');
        } else {
          console.log(err.message);
        }
      })
    })
  }
  tampilkanData() {
    let TAMPILKAN_DATA = `SELECT * FROM student`
    db.serialize(() => {
      db.all(TAMPILKAN_DATA, (err, data) => {
        if(!err) {
          console.log(data);
        } else {
          console.log(err.message);
        }
      })
    })
  }
  tampilkanStudent(name) {
    let TAMPILKAN_STUDENT = `SELECT * FROM student WHERE UPPER(firstname) = UPPER('${name}') OR UPPER(lastname) = UPPER('${name}')`
    db.serialize(() => {
      db.each(TAMPILKAN_STUDENT, (err, data) => {
        if(!err) {
          console.log(data);
        } else {
          console.log(err.message);
        }
      })
    })
  }
  tampilkanAttribute(attribute, value) {
    let TAMPILKAN_ATTRIBUTE = `SELECT * FROM student WHERE UPPER(${attribute}) = UPPER('${value}')`
    db.serialize(() => {
      db.each(TAMPILKAN_ATTRIBUTE, (err, data) => {
        if(!err) {
          console.log(data);
        } else {
          console.log(err.message);
        }
      })
    })
  }
  tampilkanUltah(month) {
    let TAMPILKAN_ULTAH = `SELECT * FROM student WHERE strftime('%m', birthdate) = '${month}'`
    db.serialize(() => {
      db.each(TAMPILKAN_ULTAH, (err, data) => {
        if(!err) {
          console.log(data);
        } else {
          console.log(err.message);
        }
      })
    })
  }
  sortUltah() {
    let SORT_ULTAH = `SELECT * FROM student ORDER BY strftime('%m %d', birthdate)`
    db.serialize(() => {
      db.each(SORT_ULTAH, (err, data) => {
        if(!err) {
          console.log(data);
        } else {
          console.log(err.message);
        }
      })
    })
  }
  help() {
    console.log(`\n HELP MENU \n =========================================================================== \n
  1. menambah student             >> addStudent("firstname", "lastname", "birthdate")\n
  2. update berdasar id           >> updateData_id("firstname", "lastname", "birthdate", "id")\n
  3. menghapus student            >> deleteStudent("id")\n
  4. menampilkan semua            >> tampilkanData()\n
  5. tampilkan berdasar nama      >> tampilkanStudent("name")\n
  6. tampilkan berdasar attribute >> tampilkanAttribute("attribute", "value")\n
  7. tampilkan berdasar bulan     >> tampilkanUltah("month")\n
  8. sort berdasar hari ultah     >> sortUltah()\n`)
  }
}

let student = new Student()
// let ridho = ["ridho", "pratama", "1994-09-23"]
let start = repl.start('> ')
start.context.addStudent = student.addStudent
start.context.updateData_id = student.updateData_id
start.context.deleteStudent = student.deleteStudent
start.context.tampilkanData = student.tampilkanData
start.context.tampilkanStudent = student.tampilkanStudent
start.context.tampilkanAttribute = student.tampilkanAttribute
start.context.tampilkanUltah = student.tampilkanUltah
start.context.sortUltah = student.sortUltah
start.context.help = student.help

"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite.Database(file);

class Student {
  static addStudent(firstname, lastname, birthdate) {
    db.serialize(function() {
     db.run(`INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}');`, function(err) {
       if (err) {
         console.log(err.message);
       } else {
         console.log('STUDENT ADDED');
       }
     });
   });
 }
 static updateStudent(id,attribute,value) {
   db.serialize(function() {
     db.run(`UPDATE student SET ${attribute} = '${value}' WHERE id = ${id};`, function(err) {
       if (err) {
         console.log(err.message);
       } else {
         console.log('STUDENT UPDATED');
       }
     });
   });
 }
 static deleteStudent(id) {
   db.serialize(function() {
     db.run(`DELETE FROM student WHERE id = ${id};`, function(err) {
       if (err) {
         console.log(err.message);
       } else {
         console.log('STUDENT DELETED');
       }
     });
   });
 }
 static listStudents() {
    db.each(`SELECT * FROM student;`, function(err,data) {
       if (err) {
         console.log(err.message);
       } else {
         console.log(data);
       }
    });
 }
 static searchStudentName(name) {
   db.each(`SELECT * FROM student WHERE firstname = '${name}' OR lastname = '${name}';`, function(err,data) {
      if (err) {
        console.log(err.message);
      } else {
        console.log(data);
      }
   });
 }
 static searchStudent(attribute,value) {
   db.each(`SELECT * FROM student WHERE ${attribute} = '${value}';`, function(err,data) {
      if (err) {
        console.log(err.message);
      } else {
        console.log(data);
      }
   });
 }
 static listBirthMonth() {
   db.each(`SELECT * FROM student WHERE strftime('%m', birthdate) = strftime('%m', 'now');`,function(err, data){
     if(err){
       console.log(err.message)
     } else {
       console.log(data)
     }
   })
   
 }
 static listBirthday() {
   db.each(`SELECT firstname, lastname, strftime('%m', birthdate) as Month, strftime('%d', birthdate) as Day FROM student ORDER BY strftime('%m''%d',birthdate);`,function(err,data){
     if(err){
       console.log(err.message)
     } else {
       console.log(data)
     }
   })
 }
 static help() {
   console.log('addStudent(firstname, lastname, birthdate)');
   console.log('updateStudent(id,attribute,value)');
   console.log('deleteStudent(id)');
   console.log('listStudents()');
   console.log('searchStudentName(name)');
   console.log('searchStudent(attribute,value)');
   console.log('listBirthMonth()');
   console.log('listBirthday()')
 }
}
let rp=repl.start('>>> ')
rp.context.addStudent = Student.addStudent
rp.context.updateStudent = Student.updateStudent
rp.context.deleteStudent = Student.deleteStudent
rp.context.listStudents = Student.listStudents
rp.context.searchStudentName = Student.searchStudentName
rp.context.searchStudent = Student.searchStudent
rp.context.listBirthMonth = Student.listBirthMonth
rp.context.listBirthday = Student.listBirthday
rp.context.help = Student.help
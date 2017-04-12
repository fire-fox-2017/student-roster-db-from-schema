"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();


let file = 'student.db';
var db = new sqlite.Database(file);

class Student{
  constructor(){

  }

  //01
  insertStudent(fname, lname, birth){
    let INSERT_DATA_STUDENT = `INSERT INTO student(firstname, lastname, birthdate) VALUES('${fname}', '${lname}', '${birth}')`
    db.serialize(function(){
      db.run(INSERT_DATA_STUDENT, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('INSERT DATA SUKSES');
        }
      });
    });
  }

  //02
  updateStudent(id, fname, lname, birth){
    let UPDATE_DATA_STUDENT = `UPDATE student SET firstname='${fname}', lastname='${lname}', birthdate='${birth}' WHERE id=${id}`
    db.serialize(function(){
      db.run(UPDATE_DATA_STUDENT, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('UPDATE DATA SUKSES');
        }
      });
    });
  }

  deleteStudent(id){
    let DELETE_DATA_STUDENT = `DELETE FROM student WHERE id=${id}`
    db.serialize(function(){
      db.run(DELETE_DATA_STUDENT, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('DELETE DATA SUKSES');
        }
      });
    });
  }

  //04
  viewAllStudents(){
    let SELECT_ALL_STUDENT = `SELECT * FROM student`
    db.serialize(function(){
      db.all(SELECT_ALL_STUDENT, function(err, row){
        if(err){
          console.log(err);
        }
        else{
          console.log(row);
        }
      });
    });
  }

  //05
  viewStudentsFromName(name){
    let FROM_NAME_STUDENT = `SELECT * FROM student WHERE UPPER(firstname)='${name.toUpperCase()}' OR UPPER(lastname)='${name.toUpperCase()}'`
    db.serialize(function(){
      db.each(FROM_NAME_STUDENT, function(err, row){
        if(err){
          console.log(err);
        }
        else{
          console.log(row);
        }
      });
    });
  }


  //06
  viewStudentsFromAtribut(colom, value){
    let FROM_ATRIBUT = `SELECT * FROM student WHERE UPPER(${colom})='${value.toUpperCase()}'`
    db.serialize(function(){
      db.each(FROM_ATRIBUT, function(err, row){
        if(err){
          console.log(err);
        }
        else{
          console.log(row);
        }
      });
    });
  }

  //07
  viewBirthThisMonth(){
    let VIEW_BIRTHDATE= `SELECT * FROM student WHERE strftime('%m', birthdate) = strftime('%m', date('now'))`
    db.serialize(function(){
      db.all(VIEW_BIRTHDATE, function(err, row){
        if(err){
          console.log(err);
        }
        else{
          console.log(row);
        }
      });
    });
  }

  //08
  viewSortBirthDay (){
    let VIEW_BIRTHDATE= `SELECT * FROM student ORDER BY strftime('%m', birthdate), strftime('%d', birthdate) `
    db.serialize(function(){
      db.all(VIEW_BIRTHDATE, function(err, row){
        if(err){
          console.log(err);
        }
        else{
          console.log(row);
        }
      });
    });
  }

  help(){
    console.log(`1. insertStudent (fname, lastname, birthdate)`)
    console.log(`2. updateStudent (id, fname, lastname, birthdate)`)
    console.log(`3. deleteStudent (id)`)
    console.log(`4. viewAllStudents ()`)
    console.log(`5. viewStudentsFromName (name)`)
    console.log(`6. viewStudentsFromAtribut(colom, value) `)
    console.log(`7. viewBirthThisMonth()`)
    console.log(`8. viewSortBirthDay()`)
    console.log(`9. help() `)
  }

}

let student = new Student()
let start = repl.start("> ")
start.context.insertStudent = student.insertStudent
start.context.viewAllStudents = student.viewAllStudents
start.context.deleteStudent = student.deleteStudent
start.context.updateStudent = student.updateStudent
start.context.viewStudentsFromName = student.viewStudentsFromName
start.context.viewStudentsFromAtribut = student.viewStudentsFromAtribut
start.context.viewBirthThisMonth = student.viewBirthThisMonth
start.context.viewSortBirthDay = student.viewSortBirthDay
start.context.help = student.help

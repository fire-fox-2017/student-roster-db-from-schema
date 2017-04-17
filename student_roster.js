"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite.Database(file);
// write your code here
class Student{
  constructor(){
    this._firstname;
    this._lastname;
    this._birthday;
  }

  get firstname(){
    return this._firstname;
  }

  get lastname(){
    return this._lastname;
  }

  get birthdate(){
    return this._birthday;
  }

  set firstname(firstname){
    return this._firstname;
  }

  set lastname(lastname){
    return this._lastname;
  }

  set birthdate(birthdate){
    return this._birthday;
  }

  addStudent(firstname,lastname,birthdate)
  {
    var query = `INSERT INTO student (firstname,lastname,birthdate) VALUES ('${firstname}','${lastname}','${birthdate}');`;
    db.serialize(function(){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('New Student Has Been Insert');
        }
      });
    });
  }

  updateStudent(id,birthdate)
  {
    var query = `UPDATE student SET birthdate = '${birthdate}' WHERE id='${id}';`;
    db.serialize(function(){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Student Has Been Updated');
        }
      });
    });
  }

  deleteStudent(firstname)
  {
    var query = `Delete FROM student WHERE firstname='${firstname}';`;
    db.serialize(function(){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Student Has Been Deleted');
        }
      });
    });
  }

  showAllStudents(){
      db.all("SELECT * FROM student",function(err,rows){
      rows.forEach(function(row){
      console.log(row.id,row.firstname,row.lastname,row.birthdate);
      })
    });
  }
  showStudentsByName(name){
      db.all(`SELECT * FROM student WHERE firstname='${name}' or lastname='${name}'`,function(err,rows){
      rows.forEach(function(row){
      console.log(row.id,row.firstname,row.lastname,row.birthdate);
      })
    });
  }

  showStudentsBy(anything,value){
      db.all(`SELECT * FROM student WHERE ${anything}='${value}'`,function(err,rows){
      rows.forEach(function(row){
      console.log(row.id,row.firstname,row.lastname,row.birthdate);
      })
    });
  }

  showStudentsByThisMonth(){
    let date=(new Date().getMonth()+1).toString();
    if(date.length===2){
    db.all(`SELECT * FROM student where strftime('%m', birthdate) = '${date}'`,function(err,rows){
    rows.forEach(function(row){
    console.log(row.id,row.firstname,row.lastname,row.birthdate);
    })
  });}
    else{
    db.all(`SELECT * FROM student where strftime('%m', birthdate) = '0${date}'`,function(err,rows){
    rows.forEach(function(row){
    console.log(row.id,row.firstname,row.lastname,row.birthdate);
    })
  });}
}

}

var student = new Student();
//student.addStudent('james','sraun','1993-04-10');
//student.updateStudent(5,'1993-10-10');
//student.deleteStudent("james");
//student.showAllStudents();
//student.showStudentsByName("Fahmi");
//student.showStudentsBy("firstname","Rubi");
student.showStudentsByThisMonth();

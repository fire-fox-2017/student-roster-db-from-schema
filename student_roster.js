"use strict"
//Import required modules
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// Class
class Student {
  constructor() {
    this.REPLServer = repl.start({prompt : '> '});
    this.query = "";
    this.REPLServer.context.add_student = this.add_student;
    this.REPLServer.context.update_student = this.update_student;
    this.REPLServer.context.delete_student = this.delete_student;
    this.REPLServer.context.list_all_student = this.list_all_student;
    this.REPLServer.context.list_student_by_name = this.list_student_by_name;
    this.REPLServer.context.list_student_by_attr = this.list_student_by_attr;
  }
  //Add students
  add_student(firstname, lastname, birthdate){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var INSERT_QUERY = `INSERT INTO students (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}');`;
    db.serialize(function(){
      db.run(INSERT_QUERY, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Add Student Succesfull');
        }
      });
    });
  }

  //Update student based by ID
  update_student(id, firstname, lastname, birthdate){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var UPDATE_QUERY = `UPDATE students SET firstname='${firstname}',lastname='${lastname}',birthdate='${birthdate}' WHERE id='${id}'`;
    db.serialize(function(){
      db.run(UPDATE_QUERY, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Update Student Data Succesfull');
        }
      });
    });
  }

  //Delete student based by id
  delete_student(id){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var DELETE_QUERY = `DELETE FROM students WHERE id='${id}' `;
    db.serialize(function(){
      db.run(DELETE_QUERY, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Delete Student Data Succesfull');
        }
      });
    });
  }
  //LIST ALL STUDENT
  list_all_student(){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var LIST_ALL_QUERY = `SELECT * FROM students`;
    db.serialize(function(){
      //db.run(LIST_ALL_QUERY, function(err){
        db.each(LIST_ALL_QUERY, function(err, row){if (err){
          console.log(err);
        } else {
          console.log(row.id, row.firstname, row.lastname, row.birthdate);
          //console.log('List All Student Data Succesfull');
        }
      });
    });
  }

  //List student by name
  list_student_by_name(search_by_name){
    // if(firstname == "" && lastname != ""){
    //   firstname = "*";
    // } else if (firstname != "" && lastname == ""){
    //   lastname = "*";
    // }
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var LIST_BY_NAME = `SELECT * FROM students WHERE firstname LIKE '${search_by_name}' OR lastname LIKE '${search_by_name}'`;
    db.serialize(function(){
      //db.run(LIST_ALL_QUERY, function(err){
        db.each(LIST_BY_NAME, function(err, row){if (err){
          console.log(err);
        } else {
          console.log(row.id, row.firstname, row.lastname, row.birthdate);
          //console.log('List All Student Data Succesfull');
        }
      });
    });
  }
  //LIST BY ATTR
  //Error tidak muncull apa2, tidak muncul list , tidak muncul error, tapi tidak jalan.
  list_student_by_attr(attribute, value){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var LIST_BY_ATRR = `SELECT * FROM students WHERE ${attribute} = '${value}'`;
    db.serialize(function(){
        db.each(LIST_BY_ATRR, function(err, row){if (err){
          console.log(err);
        } else {
          console.log(row.id, row.firstname, row.lastname, row.birthdate);
          //console.log('List All Student Data Succesfull');
        }
      });
    });
  }

}

let student_roster = new Student();

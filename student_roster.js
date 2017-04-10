"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();


const file = 'student.db'
const db = new sqlite3.Database(file)
// write your code here
//SQL Statement

const CREATE_TABLE = "CREATE TABLE IF NOT EXISTS Student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE);"
const SEED_DATA = "INSERT INTO Student (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'),('Riza','Fahmi','1983-12-31');"

//CREATE_TABLE
let createTable = () => {
  db.serialize(()=>{ //Run SQL one at a time
    db.run(CREATE_TABLE, (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    })
  })
}

//SEED_DATA
let seedData = ()=>{
  db.serialize(()=>{ //Run SQL one at a time
    db.run(SEED_DATA, (err)=>{
      if (err) {
        console.log(err);
      } else {
        console.log('SEED DATA');
      }
    })
  })
}

class Student {
  constructor() {

  }

  add_student(first,last,birth){
    let query = `INSERT INTO Student (firstname, lastname, birthdate) VALUES ('${first}','${last}','${birth}');`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('sucess');
        }
      })
    })
  }

  delete_student(id){
    let query = `DELETE FROM Student WHERE ID = ${id};`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('sucess');
        }
      })
    })
  }

  update_student(id,first,last,birth){
    let query = `UPDATE Student SET firstname = '${first}', lastname = '${last}', birthdate = '${birth}' WHERE ID = ${id};`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('sucess');
        }
      })
    })
  }

  showAll(){
    // console.log()
    let query = `SELECT * FROM Student;`
    db.all(query,(err, rows)=>{
      rows.forEach((element)=>{
        console.log(`${element.id} ${element.firstname} ${element.lastname} ${element.birthdate}`);
      })
    })
  }

  showByName(input){
    let query = `SELECT * FROM Student WHERE firstname LIKE '%${input}%' OR lastname LIKE '%${input}%';`
    db.all(query,(err, rows)=>{
      rows.forEach((element)=>{
        console.log(`${element.id} ${element.firstname} ${element.lastname} ${element.birthdate}`);
      })
    })
  }

  showByAttrib(attrib, value){
    let query = `SELECT * FROM Student WHERE ${attrib} = '${value}'`
    db.all(query,(err, rows)=>{
      rows.forEach((element)=>{
        console.log(`${element.id} ${element.firstname} ${element.lastname} ${element.birthdate}`);
      })
    })
  }

  showBirth(){
    let query = `SELECT * FROM Student WHERE strftime('%m',birthdate) = strftime('%m','now')`
    db.all(query,(err, rows)=>{
      rows.forEach((element)=>{
        console.log(`${element.id} ${element.firstname} ${element.lastname} ${element.birthdate}`);
      })
    })
  }

  showMonth(input){
    let query = `select * from student order by strftime('%m',birthdate) ${choose}`
    db.all(query,(err, rows)=>{
      rows.forEach((element)=>{
        console.log(`${element.id} ${element.firstname} ${element.lastname} ${element.birthdate}`);
      })
    })
  }

  help(){
    console.log(
      `Command Help\n***************
 1. Add Student                    : addStudent(firstname, lastname, birthdate)
 2. Update Student data            : update(id, new_firstname, new_lastname, new_birthdate)
 3. Delete Student                 : delStudent(id)
 4. List all students              : showAll()
 5. List students by name          : showbyname(name)
 6. List students by attribute     : showAttrib(attribute_name, value)
 7. List students that have birthdays this month: showBirth()
 8. List students birthdays by month : showMonth(ASC||DESC)
 9. Help                           : help()
      `
    );
  }
}

const replServer = repl.start({prompt: '> '})

replServer.context.createTable = createTable
replServer.context.seedData = seedData

let student = new Student()
replServer.context.addStudent = student.add_student;
replServer.context.delStudent = student.delete_student;
replServer.context.update = student.update_student;
replServer.context.showAll = student.showAll
replServer.context.showbyname = student.showByName
replServer.context.showAttrib = student.showByAttrib
replServer.context.showBirth = student.showBirth
replServer.context.showMonth = student.showMonth
replServer.context.help = student.help

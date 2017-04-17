"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let replWords = repl.start({prompt: '> '});
var file = 'data.db';
var db = new sqlite.Database(file);

//making class on bellow
class Student {
  constructor(id, firstname, lastname, birthdate){
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
  }

  help() {
    console.log(`===================================================================`);
    console.log(`1. createTable : for creting new table <createTable(nameOfTable)>`);
    console.log(`2. addData : adding new datas`);
    console.log(`3. updateData : to edit your data table <updateData(1, 'edi', 2)>`);
    console.log(`4. showAllData : show all your data tables`);
    console.log(`5. deleteData : to delete your data with id`);
    console.log(`6. showAllDataWithName : to show query with firstname`);
    console.log(`7. showDataWithAtribute : to query with atribute <showDataWithAtribute(1, 'nilai')>`);
    console.log(`--> for 1 to first name`);
    console.log(`--> for 2 to last name`);
    console.log(`--> for 3 to birthdate`);
    console.log(`8. showDataBirthNow : to query with month`);
    console.log(`9. showDataBirthDateNow : to query with date`);
    console.log(`====================================================================`);
  }

  createTable(name){
    let createTable = `CREATE TABLE IF NOT EXIST ${name} (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, birthdate DATE);`;
    db.serialize(function() {
      db.run(createTable, (err) =>{
        if (!err){
          console.log(`process sucess`);
        }else {
          console.log(err.message);
        }
      });
    });
  }

  addData(firstname, lastname, birthdate) {
    let addData = `INSERT INTO student (first_name, last_name, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}');`
    db.serialize(function() {
      db.run(addData, (err) =>{
        if (!err){
          console.log(`process sucess`);
        }else {
          console.log(err.message);
        }
      });
    });
  }

  updateData(choose, edit, id) {
    let dataSwitch = ``;
    if (choose === 1){
      dataSwith = `first_name`;
    } else if (choose === 2){
      dataSwitch = `last_name`;
    } else {
      dataSwitch = `birthdate`;
    }
    let updateData = `UPDATE student SET ${dataSwitch} = '${edit}' WHERE id = ${id};`;
    db.serialize(function() {
      db.run(updateData, (err) =>{
        if (!err){
          console.log(`process sucess`);
        }else {
          console.log(err.message);
        }
      });
    });
  }

  deleteData(id) {
    let deleteData = `DELETE FROM student WHERE id = ${id};`;
    db.serialize(function() {
      db.run(deleteData, (err) =>{
        if (!err){
          console.log(`process sucess`);
        }else {
          console.log(err.message);
        }
      });
    });
  }

  showAllData() {
    let showAll = `SELECT * FROM student;`;
    db.all(showAll, function(err, rows){
      rows.forEach(function (row) {
        console.log(row.id, row.first_name, row.last_name, row.birthdate);
      })
    });
  }

  showAllDataWithName(first){
    let showAllDataWithName = `SELECT * FROM student WHERE first_name = '${first}';`;
    db.all(showAllDataWithName, function(err, rows){
      rows.forEach(function (row) {
        console.log(row.id, row.first_name, row.last_name, row.birthdate);
      })
    });
  }

  showDataWithAtribute(choose, data){
    let dataSwitch = ``;
    if (choose === 1){
      dataSwitch = `first_name`;
    } else if (choose === 2){
      dataSwitch = `last_name`;
    } else {
      dataSwitch = `birthdate`;
    }
    let showDataWithAtribute = `SELECT * FROM student WHERE ${dataSwitch} = '${data}';`;
    db.all(showDataWithAtribute, function(err, rows){
      rows.forEach(function (row) {
        console.log(row.id, row.first_name, row.last_name, row.birthdate);
      })
    });
  }

  showDataBirthNow(num) {
    let showDataBirthNow = `SELECT * FROM student WHERE birthdate LIKE '%-${num}-%';`;
    db.all(showDataBirthNow, function(err, rows){
      rows.forEach(function (row) {
        console.log(row.id, row.first_name, row.last_name, row.birthdate);
      })
    });
  }

  showDataBirthDateNow(num) {
    let showDataBirthDateNow = `SELECT * FROM student WHERE birthdate like '%-${num}%' order by strftime ('%m', birthdate) asc;`;
    db.all(showDataBirthDateNow, function(err, rows){
      rows.forEach(function (row) {
        console.log(row.id, row.first_name, row.last_name, row.birthdate);
      })
    });
  }

}
let students = new Student();
replWords.context.help = students.help;
replWords.context.addData = students.addData;
replWords.context.updateData = students.updateData;
replWords.context.deleteData = students.deleteData;
replWords.context.showAllData = students.showAllData;
replWords.context.showAllDataWithName = students.showAllDataWithName;
replWords.context.dbPrint = students.dbPrint;
replWords.context.showDataWithAtribute = students.showDataWithAtribute;
replWords.context.showDataBirthNow = students.showDataBirthNow;
replWords.context.showDataBirthDateNow = students.showDataBirthDateNow;

"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here

var db = new sqlite.Database('student.db');
const replServer = repl.start({prompt : '>> '});


class Student{
  constructor(){
  }

  help(){
    console.log(`+++++++++++++++++++++++++++++`);
    console.log(` 1. createTable() \n 2. addData('first_name', 'last_name', 'date') \n 3. updateData(list using number (1.first_name 2.last_name 3.date) 'new_data id)\n 4. showAllData()\n 5. showStudentByName('first_name')\n 6. showStudentByAtribute() \n 7. showStudentByBirthDate('num') \n 8. showStudentAsc()`);
  }
  createTable(){
    var createTable = `CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, birthdate DATE)`;
    db.serialize(function(){
      db.run(createTable, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Database Running')
        }
      });
    });
  }
  addData(first, last, date){
    let insertStudentData = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${first}', '${last}', '${date}')`;
    db.serialize(function(){
      db.run(insertStudentData, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Add data success')
        }
      });
    });
  }
  updateData(list, data, id){
    let changeData = '';
    if(list == 1){
      changeData = `firstname`;
    }else if(list == 2){
      changeData = `lastname`;
    }else{
      changeData ='birthdate'
    }
    let updateStudentData = `UPDATE student SET ${changeData} = '${data}' WHERE id = ${id}; `;
    db.serialize(function(){
      db.run(updateStudentData, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Data Update')
        }
      });
    });
  }
  deleteData(id){
    let deleteData = `DELETE FROM student WHERE id = ${id};`;
    db.serialize(function(){
      db.run(deleteData, function(err){
        if(err){
          console.log(err);
        }else{
          console.log(`Database DELETE on ID ${id}`)
        }
      });
    });
  }
  showAllData(){
    let showStudentData =`SELECT * FROM student`;
    db.all(showStudentData, function(err, rows){
      rows.forEach(function (row){
        console.log(row.id, row.firstname, row.lastname, row.birthdate);
      })
    });
  }
  showStudentByName(first){
    let showStudentByName =`SELECT *FROM student WHERE firstname= '${first}'`;
    db.all(showStudentByName, function(err, rows){
      rows.forEach(function (row){
        console.log(row.id, row.firstname, row.lastname, row.birthdate);
      })
    });
  }
  showStudentByAtribute(choose, data){
    let chooseData = '';
    if(choose == 1){
      chooseData = 'firstname';
    }else if(choose == 2){
      chooseData = 'lastname';
    }else{
      chooseData = 'birthdate';
    }
    let showStudentByAtribute = `SELECT * FROM student WHERE ${chooseData}='${data}'`
    db.all(showStudentByAtribute, function(err, rows){
      rows.forEach(function (row){
        console.log(row.id, row.firstname, row.lastname, row.birthdate);
      })
    });
  }
  showStudentByBirthDate(month){
    let showStudentByBirtDate = `SELECT * from student WHERE birthdate LIKE '%-${month}-%'`;
    db.all(showStudentByBirtDate, function(err, rows){
      rows.forEach(function (row){
        console.log(row.id, row.firstname, row.lastname, row.birthdate);
      })
    });
  }
  showStudentAsc(){
    let showStudentAsc = `SELECT * FROM student order by strftime('%m', birthdate), strftime('%d', birthdate) asc`;
    db.serialize(() => {
      db.all(showStudentAsc,(err, rows) => {
        if(err) {
          console.log(err);
        } else {
          rows.forEach((row) => {
          console.log(row.id, row.firstname, row.lastname, row.birthdate);
          });
        }
      });
    });
}
}

let student = new Student();

replServer.context.help = student.help;
replServer.context.createTable = student.createTable;
replServer.context.addData = student.addData;
replServer.context.updateData = student.updateData;
replServer.context.deleteData = student.deleteData;
replServer.context.showAllData = student.showAllData;
replServer.context.showStudentByName = student.showStudentByName;
replServer.context.showStudentByAtribute = student.showStudentByAtribute;
replServer.context.showStudentByBirthDate = student.showStudentByBirthDate;
replServer.context.showStudentAsc = student.showStudentAsc;

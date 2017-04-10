"use strict"
const repl = require('repl')
const sqlite3 = require('sqlite3').verbose();

var db_student = new sqlite3.Database('student.db');

const replServer = repl.start({prompt : '> '});

// write your code here
class Students{
  constructor(){
  }
  help(){
    console.log(`- help()`);
    console.log(`- addData('first_name','last_name','birth-date ex: yyyy-mm-day')`);
    console.log(`- updateData(id,'first_name','last_name','birth-date ex: yyyy-mm-day')`);
    console.log(`- deleteData(id)`);
    console.log(`- viewData()`);
    console.log(`- viewDataName('first_name','last_name') : Menampilkan Data Berdasarkan first_name && last_name`);
    console.log(`- viewDataAttribute('attribute','data') : Menampilkan Data Berdasarkan atribut yang ditentukan`);
    console.log(`- viewBirthday('month') : Menampilkan Data Berdasarkan bulan yang ditentukan`);
    console.log(`- viewBirthToday('day') : Menampilkan Data Berdasarkan tanggal yang ditentukan`);
  }
  addData(first_name,last_name,birth_date){
    let insertStudents = `INSERT INTO students (first_name,last_name,birth_date) VALUES ('${first_name}','${last_name}','${birth_date}')`;
    db_student.serialize(() => {
      db_student.run(insertStudents,(err)=>{
        if(err){
          console.log(err);
        }else{
          console.log('Data added!!!');
        }
      })
    })
  }
  updateData(id,first_name,last_name,birth_date){
    let updateData = `UPDATE students SET first_name = '${first_name}',last_name = '${last_name}', birth_date = '${birth_date}' WHERE id = ${id}`;
    db_student.serialize(() => {
      db_student.run(updateData,(err)=>{
        if(err){
          console.log(err);
        }else{
          console.log('Data updated!!!');
        }
      })
    })
  }
  deleteData(id){
    let deleteStudent = `DELETE FROM students WHERE id=${id}`;
    db_student.serialize(() => {
      db_student.run(deleteStudent,(err)=>{
        if(err){
          console.log(err);
        }else{
          console.log('Data deleted!!!');
        }
      })
    })
  }
  viewData(){
    db_student.all(`select * from students`,(err,rows)=>{
      rows.forEach((row) => {
          console.log(row.id,row.first_name,row.last_name,row.birth_date)
      })
    })
  }
  viewDataName(name){
    db_student.all(`select * from students where first_name like '%${name}%' or last_name like '%${name}%'`,(err,rows)=>{
      rows.forEach((row) => {
          console.log(row.id,row.first_name,row.last_name,row.birth_date)
      })

    })
  }
  viewDataAttribute(attribute,data){
    db_student.all(`select * from students where ${attribute} like '%${data}%'`,(err,rows)=>{
      rows.forEach((row) => {
          console.log(row.id,row.first_name,row.last_name,row.birth_date)
      })
    })
  }
  viewBirthday(month){
  //  var search = month.replace(`${month}`,`-${month}-`)
    db_student.all(`select * from students where birth_date like '%-${month}-%'`,(err,rows)=>{
      rows.forEach((row) => {
          console.log(row.id,row.first_name,row.last_name,row.birth_date)
      })

    })
  }
  viewBirthToday(date){
    var search = date.replace(`${date}`,`-${date}`)
    db_student.all(`select * from students where birth_date like '%${search}' order by strftime('%m',birth_date) asc`,(err,rows)=>{
      rows.forEach((row) => {
          console.log(`${row.id} | ${row.first_name} | ${row.last_name} | ${row.birth_date}`)
      })
    })
  }
}

var studentShow = new Students()
replServer.context.help = studentShow.help;
replServer.context.addData = studentShow.addData;
replServer.context.updateData = studentShow.updateData;
replServer.context.deleteData = studentShow.deleteData;
replServer.context.viewData = studentShow.viewData;
replServer.context.viewDataName = studentShow.viewDataName;
replServer.context.viewDataAttribute = studentShow.viewDataAttribute;
replServer.context.viewBirthday = studentShow.viewBirthday;
replServer.context.viewBirthToday = studentShow.viewBirthToday;

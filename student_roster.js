"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var db = new sqlite.Database('./student.db');


// write your code here

class Student{
  constructor(){
    this.replServer = repl.start({prompt : '> '});
    this.replServer.context.createTable = this.createTable;
    this.replServer.context.addStudent = this.addStudent;
    this.replServer.context.updateStudent = this.updateStudent;
    this.replServer.context.deleteStudent = this.deleteStudent;
    this.replServer.context.showListStudent = this.showListStudent;
    this.replServer.context.showStudentName = this.showStudentName;
    this.replServer.context.showStudentAttribute = this.showStudentAttribute;
    this.replServer.context.showStudentBirthday = this.showStudentBirthday;
    this.replServer.context.showSortBirthday = this.showSortBirthday;
    this.replServer.context.showCommand = this.showCommand;
  }

  createTable(){
    let query1 = `CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate TEXT)`;
    db.serialize(function(){
      db.run(query1, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Sukses Buat Table');
        }
      })
    });
  }

  addStudent(firstname, lastname, birthdate){
    let query2 = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`;
    db.serialize(function(){
      db.run(query2, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Sukses Tambah Data Student');
        }
      })
    });
  }

  updateStudent(id,firstname,lastname,birthdate){
    let query3 = `UPDATE student SET firstname = '${firstname}', lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = '${id}'`;
    db.serialize(function(){
      db.run(query3, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Sukses Update Data Student');
        }
      })
    });
  }

  deleteStudent(id){
    let query4 = `DELETE FROM student WHERE id = '${id}'`;
    db.serialize(function(){
      db.run(query4, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Sukses Hapus Data Student');
        }
      })
    });
  }

  showListStudent(){
    let query5 = `SELECT * FROM student`;
    db.serialize(function(){
      db.all(query5, function(err, rows){
        if (err){
          console.log(err);
        } else {
          rows.forEach(function (row) {
            console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
        })
          // console.log('Sukses Menampilkan Daftar Student');
        }
      })
    });
  }

  showStudentName(nama){
    let query6 = `SELECT id, firstname, lastname, birthdate from student where firstname LIKE '%${nama}%' or lastname LIKE '%${nama}$'`;
    db.serialize(function(){
      db.all(query6, function(err, rows){
        if (err){
          console.log(err);
        } else {
          rows.forEach(function (row) {
            console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
        })
          // console.log('Sukses Menampilkan Daftar Student');
        }
      })
    });
  }

  showStudentAttribute(attribute, value){
    let query7 = `SELECT id, firstname, lastname, birthdate from student where ${attribute} = '${value}'`;
    db.serialize(function(){
      db.all(query7, function(err, rows){
        if (err){
          console.log(err);
        } else {
          rows.forEach(function (row) {
          console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
        })
          // console.log('Sukses Menampilkan Daftar Student');
        }
      })
    });
  }

  showSortBirthday(){
    let query9 = `select id,firstname, lastname, birthdate from(select *, strftime('%m', birthdate) as "Bulan", strftime('%d', birthdate) as "Tanggal" from student group by Bulan, Tanggal order by Bulan,Tanggal asc);`;
    db.serialize(function(){
      db.all(query9, function(err, rows){
        if (err){
          console.log(err);
        } else {
          rows.forEach(function (row) {
          console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
        })
          // console.log('Sukses Menampilkan Daftar Student');
        }
      })
    });
  }

  showStudentBirthday(){
    let date = new Date();
    let bulan = date.getMonth();
    bulan += 1;
    let query8 = `SELECT * FROM student`;
    db.serialize(function(){
      db.all(query8, function(err, rows){
        if (err){
          console.log(err);
        } else {
          rows.forEach(function (row) {
          let str = row.birthdate;
          let bulanBirth = str.split('-');

          if((bulanBirth[1]) == bulan){
            // console.log(bulanBirth[1]);
            // console.log(bulan);
            console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
          }
        })
        }
      })
    });
  }

  showCommand(){
    console.log(`------------------------- Aplikasi Student -------------------------\n`);
    console.log(`addStudent(firstname, lastname, birthdata) : menambah data student`);
    console.log(`updateStudent(id,firstname,lastname,birthdate) : update data student`);
    console.log(`deleteStudent(id) : delete data student`);
    console.log(`showListStudent() : menampilkan daftar student`);
    console.log(`showStudentName(nama) : menampilkan daftar student berdasarkan nama`);
    console.log(`showStudentAttribute(attribute, value) : menampilkan data student berdasarkan atribut dan value tertentu`);
    console.log(`showSortBirthday() : menampilkan daftar student urut berdasarkan tanggal ulang tahun`);
    console.log(`showStudentBirthday() : menampilkan data student yang berulang tahun bulan ini`);
  }



}

let siswa1 = new Student();
// siswa1.getData('ilham');

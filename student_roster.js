"use strict"

const sqlite = require('sqlite3').verbose();
const repl = require('repl');
const replServer = repl.start({prompt:`>>> `});
const file = 'student.db';
const db = new sqlite.Database(file);

// write your code here asdasdasd
class Student {
	create_table() {
		db.serialize(function(){
			let CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT, birth_date TEXT);';
			db.run(CREATE_TABLE,function(err) {
				if(err){console.log(err)} else {console.log('Table created')}
			});
		});
	}

	seed_data(firstname,lastname,birthdate){
		db.serialize(function(){
			db.run(`INSERT INTO students (first_name,last_name,birth_date) VALUES ('${firstname}','${lastname}','${birthdate}');`,function(err) {
				if(!err){console.log('Data inserted')} else {console.log(err)}
			});
		});
	}

  update_data(id,attribute,update){
    db.serialize(function(){
      db.run(`UPDATE students SET ${attribute} = '${update}' WHERE id = ${id};`,function(err) {
        if(!err){console.log('Data inserted')} else {console.log(err)}
      });
    });
  }

  delete_data(id){
    db.serialize(function(){
      db.run(`DELETE FROM students WHERE id = ${id};`,function(err) {
        if(!err){console.log(`Data ${id} deleted`)} else {console.log(err)}
      });
    });
  }

  show_data(){
    db.serialize(function(){
      db.each(`SELECT * FROM students;`,function(err,row) {
        if(!err){console.log(`${row.id} | ${row.first_name} | ${row.last_name} | ${row.birth_date}`)} else {console.log(err)}
      });
    });
  }

  filter_by_name(name){
    db.serialize(function(){
      db.each(`SELECT * FROM students WHERE first_name LIKE '%${name}%' OR last_name LIKE '%${name}%';`,function(err,row) {
        if(!err){console.log(`\n${row.id} | ${row.first_name} | ${row.last_name} | ${row.birth_date}`)} else {console.log(err)}
      });
    });
  }
  filter_by_attribute(attribute,value){
    db.serialize(function(){
      db.each(`SELECT * FROM students WHERE ${attribute}='${value}';`,function(err,row) {
        if(!err){console.log(`${row.id} | ${row.first_name} | ${row.last_name} | ${row.birth_date}`)} else {console.log(err)}
      });
    });
  }
  birthday_this_month(){
    db.serialize(function(){
      db.each(`SELECT * FROM students WHERE strftime('%m', birth_date)=strftime('%m', 'now');`,function(err,row) {
        if(!err){console.log(`${row.id} | ${row.first_name} | ${row.last_name} | ${row.birth_date}`)} else {console.log(err)}
      });
    });
  }
  sort_by_birthday(){
    db.serialize(function(){
      db.each(`SELECT * FROM students ORDER BY strftime('%m', birth_date),strftime('%d', birth_date);`,function(err,row) {
        if(!err){console.log(`${row.id} | ${row.first_name} | ${row.last_name} | ${row.birth_date}`)} else {console.log(err)}
      });
    });
  }
  help(){
    console.log(
    `    create_table                                 : Membuat tabel
    seed_data                                    : Menambahkan data
    update_data(id,attribute,update)             : Mengupdate data pada attribute tertentu dan ID tertentu
    delete_data(id)                              : Menghapus data ID tertentu
    show_data                                    : Menampilkan seluruh data
    filter_by_name(string)                       : Menampilkan data yang difilter berdasarkan nama yang mengandung string tertentu
    filter_by_attribute(attribute,value)         : Menampilkan data yang difilter berdasarkan attribute dengan nilai tertentu
    birthday_this_month                          : Menampilkan yg berulang tahun bulan ini
    sort_by_birthday                             : Menampilkan dan sorting berdasarkan hari ulang tahun`
    );
  }
}

let student = new Student()
replServer.context.create_table = student.create_table;
replServer.context.seed_data = student.seed_data;
replServer.context.update_data = student.update_data;
replServer.context.delete_data = student.delete_data;
replServer.context.show_data = student.show_data;
replServer.context.filter_by_name = student.filter_by_name;
replServer.context.filter_by_attribute = student.filter_by_attribute;
replServer.context.birthday_this_month = student.birthday_this_month;
replServer.context.sort_by_birthday = student.sort_by_birthday;
replServer.context.help = student.help;

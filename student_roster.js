"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);


// write your code here
class Student {
  constructor () {
    // this.file = 'student.db';
    // this.db = new sqlite.Database(this.file);
  }

  runQuery(query) {
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('QUERY Ran Successfully!');
        }
      });
    });
  }

  //1
  addStudent(firstname, lastname, birthdate) {
    let query = `INSERT INTO Students(firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`;
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('QUERY Ran Successfully!');
        }
      });
    });
  }

  //2
  updateStudent(id, new_firstname, new_lastname, new_birthdate) {
    let query =
      `UPDATE students SET firstname = '${new_firstname}', lastname = '${new_lastname}', birthdate = '${new_birthdate}' WHERE id = ${id}`;

      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
          }else {
            console.log('QUERY Ran Successfully!');
          }
        });
      });
  }

  //3
  deleteStudent(id) {
    let query = `DELETE FROM students WHERE id = ${id}`;
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('QUERY Ran Successfully!');
        }
      });
    });


    // this.runQuery(query);
  }


  runQuerySelect(query) {
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      })
    });
  }

  //4
  listStudents() {
    let query = `SELECT * FROM Students`;
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      })
    });
    // this.runQuerySelect(query);
  }

  //5
  listStudentsByName(search_name) {
    let query = `SELECT * FROM Students where firstname like '%${search_name}%' OR lastname like '%${search_name}%'`;
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      })
    });
    // this.runQuerySelect(query);
  }

//6
  listStudentsByAttribute(attribute_name, value) {
    let query = `SELECT * FROM Students where ${attribute_name}= '${value}'`;
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      })
    });
    // this.runQuerySelect(query);
  }


  //7
  listStudentsBirthday() {
    let query = `SELECT * FROM Students where strftime('%m', birthdate) = strftime('%m', 'now')`;
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      })
    });
  }



  //8
  listStudentsBirthdayByMonth() {
    let query = `select id, firstname, lastname, strftime('%m.%d', birthdate) as birthdate from students order by birthdate asc`;
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      })
    });
  }

  printHelp() {
    console.log(
      `Command Help\n***************
      1. Add Student                    : addStudent(firstname, lastname, birthdate)
      2. Update Student data            : updateStudent(id, new_firstname, new_lastname, new_birthdate)
      3. Delete Student                 : deleteStudent(id)
      4. List all students              : list()
      5. List students by name          : listByName(name)
      6. List students by attribute     : listByAttribute(attribute_name, value)
      7. List students that have birthdays this month: listByBirthdayThisMonth()
      8. List students birthdays by month : listByBirthdayByMonth()
      9. Help

      `
    );
  }


} // end of Student Class


// pake repl??

let student = new Student();

// student.addStudent("David", "Johnson", "1992-01-01");
// student.addStudent("Brandin", "Cooks", "1984-04-10");

// student.updateStudent(5, 'David', 'Johnson', '1990-01-01');
// student.updateStudent(6, 'Ben', 'Roth', '1989-06-19');

// student.deleteStudent(9);
// student.listStudents();
// console.log("----")
// student.listStudentsByName("Ben");

// student.listStudentsByAttribute("lastname", 'Cooks');
// student.listStudentsBirthday();
// student.listStudentsBirthdayByMonth();




const replServer = repl.start({prompt: '>  '});
//1
replServer.context.addStudent = student.addStudent;
//2
replServer.context.updateStudent = student.updateStudent;
//3
replServer.context.deleteStudent = student.deleteStudent;
//4
replServer.context.list = student.list;
//5
replServer.context.listByName = student.listStudentsByName;
//6
replServer.context.listByAttribute = student.listStudentsByAttribute;
//7
replServer.context.listByBirthdayThisMonth = student.listStudentsBirthday;
//8
replServer.context.listByBirthdayByMonth = student.listStudentsBirthdayByMonth;
//9
replServer.context.help = student.printHelp;

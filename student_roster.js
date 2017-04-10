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
    let add_student = `INSERT INTO student (firstname, lastname, birtdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`;
    db.serialize(function () {
      db.run(add_student, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('Insert data success!');
        }
      });
    });
  }

  //2
  updateStudent(id, new_firstname, new_lastname, new_birthdate) {
    let update_student =
      `UPDATE student SET firstname = '${new_firstname}', lastname = '${new_lastname}', birtdate = '${new_birthdate}' WHERE id = ${id}`;

      db.serialize(function () {
        db.run(update_student, function (err) {
          if (err) {
            console.log(err);
          }else {
            console.log('QUERY Run Successfully!');
          }
        });
      });
  }

  //3
  deleteStudent(id) {
    let delete_student = `DELETE FROM student WHERE id = ${id}`;
    db.serialize(function () {
      db.run(delete_student, function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('QUERY Run Successfully!');
        }
      });
    });


    // this.runQuery(query);
  }


  runQuerySelect(query) {
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birtdate}`);
      })
    });
  }

  //4
  listStudents() {
    let list = `SELECT * FROM student`;
    db.all(list, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birtdate}`);
      })
    });
    // this.runQuerySelect(query);
  }

  //5
  listStudentsByName(search_name) {
    let search = `SELECT * FROM student where firstname like '%${search_name}%' OR lastname like '%${search_name}%'`;
    db.all(search, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birtdate}`);
      })
    });
    // this.runQuerySelect(query);
  }

//6
  listStudentsByAttribute(attribute_name, value) {
    let query = `SELECT * FROM student where ${attribute_name}= '${value}'`;
    db.all(query, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birtdate}`);
      })
    });
    // this.runQuerySelect(query);
  }


  //7
  listStudentsBirthday() {
    let search = `SELECT * FROM student where strftime('%m', birtdate) = strftime('%m', 'now')`;
    db.all(search, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birtdate}`);
      })
    });
  }



  //8
  listStudentsBirthdayByMonth() {
    let search = `select id, firstname, lastname, strftime('%m.%d', birtdate) as birtdate from student order by birtdate asc`;
    db.all(search, function(err, rows) {
      rows.forEach(function(row) {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birtdate}`);
      })
    });
  }

  printHelp() {
    console.log(
      `Command Help\n***************
      1. Add Student                    : addStudent(firstname, lastname, birthdate)
      2. Update Student data            : updateStudent(id, new_firstname, new_lastname, new_birthdate)
      3. Delete Student                 : deleteStudent(id)
      4. List all students              : listStudents()
      5. List students by name          : listStudentsByName(name)
      6. List students by attribute     : listStudentsByAttribute(attribute_name, value)
      7. List students that have birthdays this month: listStudentsBirthday()
      8. List students birthdays by month : listByBirthdayByMonth()
      9. Help
      `
    );
  }


} // end of Student Class


let student = new Student();

const replServer = repl.start({prompt: '>  '});
//1
replServer.context.addStudent = student.addStudent;
//2
replServer.context.updateStudent = student.updateStudent;
//3
replServer.context.deleteStudent = student.deleteStudent;
//4
replServer.context.listStudents = student.listStudents;
//5
replServer.context.listStudentsByName = student.listStudentsByName;
//6
replServer.context.listStudentsByAttribute = student.listStudentsByAttribute;
//7
replServer.context.listStudentsBirthday = student.listStudentsBirthday;
//8
replServer.context.listStudentsBirthdayByMonth = student.listStudentsBirthdayByMonth;
//9
replServer.context.help = student.printHelp;

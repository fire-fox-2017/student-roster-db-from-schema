"use strict"

// write your code here
const repl = require('repl');
const replServer = repl.start({
    prompt: '> '
});
var sqlite = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite.Database(file);

class Student {
    constructor() {}
    addStudent(firstname, lastname, birthdate) {
        db.serialize(function() {
            db.run(`INSERT INTO student (firstname,lastname,birthdate) VALUES ('${firstname}','${lastname}','${birthdate}');`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Add Student Succes.');
                }
            });
        });
    }
    updateStudent(id, firstname, lastname, birthdate) {
        db.serialize(function() {
            db.run(`UPDATE student SET firstname='${firstname}',lastname='${lastname}',birthdate='${birthdate}' WHERE id=${id};`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Update Student Succes.');
                }
            });
        });
    }
    deleteStudent(id) {
        db.serialize(function() {
            db.run(`DELETE FROM student WHERE id=${id};`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Delete Student Succes.');
                }
            });
        });
    }
    showStudent() {
        db.serialize(function() {
            db.each(`SELECT * FROM student;`, function(err, row) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
                }
            });
        });
    }
    findStudent(name) {
        db.serialize(function() {
            db.each(`SELECT * FROM student where firstname LIKE '%${name}%' or lastname LIKE '%${name}%' ;`, function(err, row) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
                }
            });
        });
    }
    attribStudent(params, value) {
        db.serialize(function() {
            db.each(`SELECT * FROM student where ${params}='${value}';`, function(err, row) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
                }
            });
        });
    }
    birthStudent() {
        db.serialize(function() {
            db.each(`SELECT * FROM student where strftime('%m',birthdate)=strftime('%m','now') ;`, function(err, row) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
                }
            });
        });
    }
    sortBirth() {
        db.serialize(function() {
            db.each(`SELECT * FROM student ORDER BY strftime('%m',birthdate),strftime('%w',birthdate);`, function(err, row) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
                }
            });
        });

    }
    help() {
        console.log(`add <firstname,lastname,birthdate>`);
        console.log(`update <id,firstname,lastname,birthdate>`);
        console.log(`remove <id>`);
        console.log(`showme`);
        console.log(`findname <firstname or lastname>`);
        console.log(`findattrib <attrib,value>`);
        console.log(`birthday`);
        console.log(`sortbirth`);
    }
}

let myStudent = new Student();
replServer.context.add = myStudent.addStudent;
replServer.context.update = myStudent.updateStudent;
replServer.context.remove = myStudent.deleteStudent;
replServer.context.showme = myStudent.showStudent;
replServer.context.findname = myStudent.findStudent;
replServer.context.findattrib = myStudent.attribStudent;
replServer.context.birthday = myStudent.birthStudent;
replServer.context.sortbirth = myStudent.sortBirth;
replServer.context.help = myStudent.help;

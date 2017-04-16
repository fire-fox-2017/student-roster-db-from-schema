"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

class Student {
    constructor() {

        this.db = new sqlite.Database('student.db');

        this.replServer = repl.start({
            prompt: '> '
        });
        this.replServer.context.deleteS = this.deleteStudent
        this.replServer.context.add = this.addStudent
        this.replServer.context.update = this.updateStudent
        this.replServer.context.show = this.showStudent
        this.replServer.context.showN = this.showName
        this.replServer.context.showS = this.showAttrib
        this.replServer.context.showU = this.showUltah
        this.replServer.context.showB = this.showUltahSort
        this.replServer.context.showM = this.showMenu
        this.showMenu()


    }

    deleteStudent(id) {
        console.log('cumi');
        let DELETE_QUERY = `DELETE FROM students WHERE id=${id}`;
        console.log(DELETE_QUERY);
        let file = 'student.db';
        let db = new sqlite.Database(file)
        db.serialize(function() {
            db.run(DELETE_QUERY, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('DELETE SUCCESSFUL');
                }
            });
        });

    }

    addStudent(fs, ls, birthDt) {
        let INSERT_QUERY = `INSERT INTO students (firstname, lastname, birthdate) VALUES ('${fs}', '${ls}', '${birthDt}');`;
        console.log(INSERT_QUERY);
        let file = 'student.db';
        let db = new sqlite.Database(file)
        db.serialize(function() {
            db.run(INSERT_QUERY, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('INSERT SUCCESSFUL');
                }
            });
        });

    }

    updateStudent(fs, ls, birthDt, id) {

        let UPDATE_QUERY = `UPDATE students SET firstname = '${fs}',lastname = '${ls}', birthdate = '${birthDt}' WHERE id=${id};`;
        console.log(UPDATE_QUERY);
        let file = 'student.db';
        let db = new sqlite.Database(file)
        db.serialize(function() {
            db.run(UPDATE_QUERY, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('UPDATE SUCCESSFUL');
                }
            });
        });

    }

    showName(name) {
        let SELECT_QUERY = `SELECT * FROM students WHERE firstname = '${name}'`;
        console.log(SELECT_QUERY);
        let file = 'student.db';
        let db = new sqlite.Database(file)
        db.serialize(function() {
            console.log(` id | first name | last name | birthdate`);
            db.each(SELECT_QUERY, function(err, row) {
                if (err) {
                    console.log(err);
                }
                console.log(JSON.stringify(row))
                // console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
            });
        });
    
}
showUltah() {

    let SELECT_QUERY = `SELECT * FROM students where strftime('%m',birthdate)=strftime('%m','now') ;`;
    console.log(SELECT_QUERY)
    let file = 'student.db';
    let db = new sqlite.Database(file)
    db.serialize(function() {
        console.log(` id | first name | last name | birthdate`);
        db.each(SELECT_QUERY, function(err, row) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(row))
            // console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
        });
    });

}

showUltahSort() {
    let SELECT_QUERY = `SELECT * FROM students ORDER BY strftime('%m',birthdate),strftime('%w',birthdate);`;
    console.log(SELECT_QUERY)
    let file = 'student.db';
    let db = new sqlite.Database(file)
    db.serialize(function() {
        console.log(` id | first name | last name | birthdate`);
        db.each(SELECT_QUERY, function(err, row) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(row))
            // console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
        });
    });

}

showAttrib(attrib, value) {
    let SELECT_QUERY = `SELECT * FROM students WHERE ${attrib} = '${value}';`;
    console.log(SELECT_QUERY)
    let file = 'student.db';
    let db = new sqlite.Database(file)
    db.serialize(function() {
        console.log(` id | first name | last name | birthdate`);
        db.each(SELECT_QUERY, function(err, row) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(row))
            // console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
        });
    });

}


showStudent() {
    let SELECT_QUERY = `SELECT * FROM students`;
    console.log(SELECT_QUERY);
    let file = 'student.db';
    let db = new sqlite.Database(file)
    db.serialize(function() {
        console.log(` id | first name | last name | birthdate`);
        db.each(SELECT_QUERY, function(err, row) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(row))
            // console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.birthdate}`);
        });
    });

}
showMenu() {
    console.log(`WELCOME!!`);
    console.log(`- Menambahkan Student : add('[firstname]','[lastname]','[Year-Month-Day]')`);
    console.log(`- Update data student berdasarkan id : update('[firstname]','[lastname]','[Year-Month-Day]','[id]')`);
    console.log(`- Menghapus student berdasarkan id : deleteS([id])`);
    console.log(`- Menampilkan daftar semua student : show()`);
    console.log(`- Menampilkan student berdasarkan name tertentu : showN('[firstname]')`);
    console.log(`- Menampilkan student dengan sesui atribut search yang diinginkan : showS([attribute],[value])`);
    console.log(`- Menampilkan student yang berulang tahun bulan ini : showU()`);
    console.log(`- Menampilkan urutan semua student berdasarkan ulang tahun : showB()`);
}


}

// write your code here
let murid = new Student();

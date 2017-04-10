"use strict"

const sqlite = require('sqlite3').verbose()
const file = 'student.db'
const db = new sqlite.Database(file)
class Student {
    constructor() {
        this.repl = require('repl')
        this.replServer = this.repl.start({
            prompt: '> '
        })
    }

    create_table() {
        db.serialize(function() {
            // create table
            let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE);`
            db.run(CREATE_TABLE, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('CREATE TABLE');
                }
            })
        })
    }

    seed_data(firstname, lastname, birthdate) {
        db.serialize(function() {
            let SEED_DATA = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}');`
            db.run(SEED_DATA, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('INSERT INTO');
                }
            })
        })
    }

    update_data(id, colValue, dataValue) {
        db.serialize(function() {
            let UPDATE_DATA = `UPDATE student set ${colValue} = '${dataValue}' where id = ${id};`
            db.run(UPDATE_DATA, function(err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Column ${colValue} id: ${id} has been changed become ${dataValue}`);
                }
            })
        })
    }

    delete_data(id) {
        db.serialize(function() {
            let DELETE_DATA = `DELETE FROM student WHERE id = ${id};`
            db.run(DELETE_DATA, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Data id: ${id} has been deleted.`);
                }
            })
        })
    }

    select_all_data_student() {
        db.serialize(function() {
            let SELECT_ALL_DATA_STUDENT = `SELECT * FROM student;`
            db.all(SELECT_ALL_DATA_STUDENT, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    rows.forEach((row) => {
                        console.log(`${row.id}. ${row.firstname}, ${row.lastname}, ${row.birthdate}`);
                    })
                }
            })
        })
    }

    select_data_with_name(name) {
        db.serialize(function() {
            let SELECT_STUDENT_FROM_NAME = `SELECT * FROM student WHERE firstname LIKE '%${name}%' OR lastname LIKE '%${name}%';`
            db.all(SELECT_STUDENT_FROM_NAME, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    rows.forEach((row) => {
                        console.log(`${row.id}. ${row.firstname}, ${row.lastname}, ${row.birthdate}`);
                    })
                }
            })
        })
    }

    select_data_with_attribute(atribut, value) {
        db.serialize(function() {
            let SELECT_STUDENT_FROM_NAME = `SELECT * FROM student WHERE ${atribut} = '${value}'`
            db.all(SELECT_STUDENT_FROM_NAME, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    rows.forEach((row) => {
                        console.log(`${row.id}. ${row.firstname}, ${row.lastname}, ${row.birthdate}`);
                    })
                }
            })
        })
    }

    select_student_birthday(month) {
        db.serialize(function() {
            let SELECT_STUDENT_BIRTHDAY = `SELECT * FROM student WHERE birthdate LIKE '%-${month}-%'`
            db.all(SELECT_STUDENT_BIRTHDAY, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    rows.forEach((row) => {
                        console.log(`${row.id}. ${row.firstname}, ${row.lastname}, ${row.birthdate}`);
                    })
                }
            })
        })
    }

    select_student_birthday_sort() {
        db.serialize(function() {
            let SELECT_STUDENT_BIRTHDAY_SORT = `SELECT * FROM student ORDER BY strftime('%m', birthdate), strftime('%d', birthdate) ASC`
            db.all(SELECT_STUDENT_BIRTHDAY_SORT, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    rows.forEach((row) => {
                        console.log(`${row.id}. ${row.firstname}, ${row.lastname}, ${row.birthdate}`);
                    })
                }
            })
        })
    }

    help() {
        let list_of_help = [
            `INSERT INTO student (firstname, lastname, birthdate) VALUES ('firstname', 'lastname', 'birthdate'); ==> Menambahkan student`,
            `UPDATE student set colValue = 'dataValue' where id = id; ==> Update data student berdasarkan id`,
            `DELETE FROM student WHERE id = id; ==> Menghapus student`,
            `SELECT * FROM student; ==> Menampilkan daftar semua student`,
            `SELECT * FROM student WHERE atribut = 'value'; ==> Menampilkan semua student yang memiliki name tertentu`,
            `SELECT * FROM student WHERE birthdate LIKE '%-month-%'; ==> Menampilkan daftar student yang berulang tahun di bulan ini`,
            `SELECT * FROM student ORDER BY strftime('%m', birthdate), strftime('%d', birthdate) ASC; ==> Menampilkan daftar student berdasarkan hari ulang tahunnya, berurutan mulai bulan januari - desember`
        ]
        for (let i = 0; i < list_of_help.length; i++) {
            console.log(`${i+1}. ${list_of_help[i]}`);
        }
    }

    runReplServer() {
        this.replServer.context.create_table = this.create_table
        this.replServer.context.seed_data = this.seed_data
        this.replServer.context.update_data = this.update_data
        this.replServer.context.delete_data = this.delete_data
        this.replServer.context.get_all_data = this.select_all_data_student
        this.replServer.context.get_data_by_name = this.select_data_with_name
        this.replServer.context.get_data_attribut = this.select_data_with_attribute
        this.replServer.context.get_student_birthday = this.select_student_birthday
        this.replServer.context.get_student_birthday_sort = this.select_student_birthday_sort
        this.replServer.context.help = this.help
    }
}

let student = new Student()
student.runReplServer()
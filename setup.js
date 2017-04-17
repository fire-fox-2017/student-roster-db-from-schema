"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let replServer = repl.start({
    prompt: '> '
});

let file = 'student.db';
let db = new sqlite.Database(file);

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birth_date TEXT);";

let create_table = function() {
    db.serialize(() => {
        db.run(CREATE_TABLE, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Table created');
            }
        });
    });
}

let seed_data = function(firstname, lastname, birthdate) {
    db.serialize(function() {
        db.run(`INSERT INTO students (first_name, last_name, birth_date) VALUES ('${firstname}', '${lastname}', '${birthdate}');`, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log(`Data inserted.`)
            }
        })
    })
}

replServer.context.create_table = create_table
replServer.context.seed_data = seed_data

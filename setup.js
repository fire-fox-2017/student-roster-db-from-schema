"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose()

//write your code here
let replServer = repl.start({
    prompt: '> '
});

let file = 'student.db'
let db = new sqlite.Database(file)

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birth_date TEXT)";
let SEED_DATA = "INSERT INTO students (firstname, lastname, birth_date) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";

let create_table = () => {
    db.serialize(() => {
        db.run(CREATE_TABLE, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Create table is successfull!')
            }
        })
    })
}

let seed_data = (firstname, lastname, birth_date) => {
    db.serialize(() => {
        db.run(`INSERT INTO students (firstname, lastname, birth_date) VALUES ('${firstname}', '${lastname}', '${birth_date}')`, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Insert data to database is succesfully.`)
            }
        })
    })
}

replServer.context.create_table = create_table
replServer.context.seed_data = seed_data
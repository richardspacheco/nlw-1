const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // const entry = ''
    // db.run(`DELETE FROM places WHERE id = ?`, entry, function (err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log('Registro deletado com sucesso')
    // })
})
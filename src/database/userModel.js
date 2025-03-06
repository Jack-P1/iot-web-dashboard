const sqlite = require('sqlite3')
const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("ERROR CONNECTING TO TEST DB: " + err)
    }
});

exports.findUserByEmail = async (param) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT id FROM user WHERE email = ?', [param.email], (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })

}

const sqlite = require('sqlite3')
const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("ERROR CONNECTING TO TEST DB: " + err)
    }
});

exports.findItemIdByName = async (params) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT id FROM item WHERE name = ?', [params.name], (err, row) => {
            if (err) reject(err);
            console.log(row);
            resolve(row);
        })
    })
}

exports.createNewItem = async (params) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO item (name, reading, branchId) VALUES (?,?,?)', [params.name, params.reading, params.branchId], (err) => {
            if (err) reject(err);
            resolve();
        })
    })
}

exports.getAllItemsByBranchId = async (params) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT id, name, reading FROM item WHERE branchId = ?', [params.branchId], (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
}

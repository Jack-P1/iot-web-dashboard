const sqlite = require('sqlite3')
const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("ERROR CONNECTING TO TEST DB: " + err)
    }
});

exports.getItemById = async (params) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM item WHERE id = ?', [params.itemId], (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
}


exports.findItemIdByName = async (params) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT id FROM item WHERE name = ?', [params.name], (err, row) => {
            if (err) reject(err);
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
        db.all('SELECT id, name FROM item WHERE branchId = ?', [params.branchId], (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
}

exports.getBranchIdByItemId = async (params) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT branchId FROM item WHERE id = ?', [params.itemId], (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
}

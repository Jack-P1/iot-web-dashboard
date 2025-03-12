const sqlite = require('sqlite3')
const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("ERROR CONNECTING TO TEST DB: " + err)
    }
});

exports.findGroupByKey = async (params) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT id FROM mqtt_group WHERE groupKey = ?', [params.key], (err, row) => {
            if (err) reject(err);
            console.log(row);
            resolve(row);
        })
    })
}

exports.getBranchId = async (params) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT branchId FROM mqtt_group WHERE id = ?', [params.id], (err, row) => {
            if (err) reject(err);
            console.log(row);
            resolve(row);
        })
    })
}

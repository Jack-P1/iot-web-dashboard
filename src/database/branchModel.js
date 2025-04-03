const sqlite = require('sqlite3')
const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("ERROR CONNECTING TO TEST DB: " + err)
    }
});

exports.getAllBranchesByCompanyId = async (params) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT id, name, location FROM branch WHERE companyId = ?', [params.companyId], (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
}

exports.getAllBranchesForUser = async (params) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT branch.id, name, location FROM branch INNER JOIN user ON branch.companyId = user.companyId WHERE user.Id = ?', [params.userId], (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
}
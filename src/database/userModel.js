const sqlite = require('sqlite3')
const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("ERROR CONNECTING TO TEST DB: " + err)
    }
});

exports.findUserByEmail = async (params) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM user WHERE email = ?', [params.email], (err, row) => {
            if (err) reject(err);
            console.log(row);
            resolve(row);
        })
    })
}

exports.getUserById = async (params) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT user.username, user.email, role.roleName, company.name AS companyName FROM user INNER JOIN role ON user.roleId = role.id INNER JOIN company ON user.companyId = company.id WHERE user.id = ?', [params.userId], (err, row) => {
            if (err) reject(err);
            console.log(row);
            resolve(row);
        })
    })
}

exports.getUserCompanyId = async (params) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT companyId FROM user WHERE id = ?', [params.userId], (err, row) => {
            if (err) reject(err);
            console.log(row);
            resolve(row);
        })
    })
}

exports.createNewUser = async (params) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO user (username, email, password) VALUES (?,?,?)', [params.username, params.email, params.password], (err) => {
            if (err) reject(err);
            resolve();
        })
    })
}

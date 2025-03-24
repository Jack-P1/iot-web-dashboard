const sqlite = require('sqlite3')
const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("ERROR CONNECTING TO TEST DB: " + err)
    }
});

exports.createNewTopic = async (params) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO mqtt_topic (topic, qos, last_payload, itemId) VALUES (?,?,?,?)', [params.topic, params.qos, params.last_payload, params.itemId], (err) => {
            if (err) reject(err);
            resolve();
        })
    })
}

exports.getTopicByItemId = async (params) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM mqtt_topic WHERE itemId = ?', [params.itemId], (err, row) => {
            if (err) reject(err);
            console.log(row);
            resolve(row);
        })
    })
}

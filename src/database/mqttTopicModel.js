const sqlite = require('sqlite3')
const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

// TODO improve db management
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

exports.getAllTopicAndBranchId = async (params) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT item.id, mqtt_topic.topic, mqtt_group.groupKey, item.branchId FROM mqtt_topic INNER JOIN item ON mqtt_topic.itemId = item.id INNER JOIN mqtt_group ON item.branchId = mqtt_group.branchId', 
            [], 
            (err, row) => {
            if (err) reject(err);
            console.log(row);
            resolve(row);
        })
    })
}


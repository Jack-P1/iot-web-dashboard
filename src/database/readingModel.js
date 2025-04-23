const sqlite = require('sqlite3')
const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

// TODO improve db management
const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("ERROR CONNECTING TO TEST DB: " + err)
    }
});

exports.getReadingsByItemId = async (params) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM reading WHERE itemId = ? ORDER BY timestamp DESC LIMIT ?', [params.itemId, params.limit], (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
}

exports.bulkInsert = async (params) => {
    return new Promise((resolve, reject) => {
        if(params?.length){
            db.serialize(() => {
                db.run("begin transaction");
    
                for (let i = 0; i < params.length; i++){
                    const {id, data} = params[i];

                    if(!data){
                        continue
                    }

                    db.get("SELECT distance FROM reading WHERE itemId = ? ORDER BY timestamp DESC LIMIT 1", [id], (err, row) => {
                        if(err) {
                            reject(err);
                            return
                        }

                        if(!row || row.distance != data.distance){
                            console.log("DISTANCE: ",  data.distance)
                            db.run("INSERT INTO reading (itemId, distance, temperature) VALUES (?,?,?)", [id, data.distance, data.temp], (err) => {
                                if (err) reject(err);
                            })
                        }
                    })
                }

                db.run("commit", (err) => {
                    if(err) reject(err);
                    else resolve();
                });
            })
        } else {
            reject()
        }
    })
}

exports.getLatest

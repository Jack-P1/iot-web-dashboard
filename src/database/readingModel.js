const sqlite = require('sqlite3')
const path = require("path");
const dbPath = path.resolve(__dirname, "test.db");

// TODO improve db management
const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("ERROR CONNECTING TO TEST DB: " + err)
    }
});

// exports.bulkInsert = async (params) => {
//     return new Promise((resolve, reject) => {
//         if(params?.length){
//             db.serialize(() => {
//                 db.run("begin transaction");
    
//                 for (let i = 0; i < params.length; i++){
                    
//                     db.run("INSERT INTO reading (itemId, reading_value) VALUES (?,?);", params[i].id, params[i].data, (err) => {
//                         if (err) reject(err);
//                     })
//                 }

//                 db.run("commit");
//             })
//         } else {
//             reject()
//         }
//     })
// }

exports.bulkInsert = async (params) => {
    return new Promise((resolve, reject) => {
        if(params?.length){
            db.serialize(() => {
                db.run("begin transaction");
    
                for (let i = 0; i < params.length; i++){
                    const {id, data} = params[i];

                    db.get("SELECT reading_value FROM reading WHERE itemId = ? ORDER BY timestamp DESC LIMIT 1", [id], (err, row) => {
                        if(err) {
                            reject(err);
                            return
                        }

                        if(!row || row.reading_value !== data){
                            db.run("INSERT INTO reading (itemId, reading_value) VALUES (?,?)", [id, data], (err) => {
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

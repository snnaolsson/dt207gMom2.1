//*Installationsfil för sqlite3 */

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/cv.db");
db.serialize(()=> {
    db.run("DROP TABLE IF EXISTS jobs;");
    db.run(`
    CREATE TABLE jobs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
        companyname TEXT NOT NULL,
        jobtitle TEXT NOT NULL,
        location TEXT,
        startdate TEXT,
        enddate TEXT
    
    );
    `);
})

db.close();
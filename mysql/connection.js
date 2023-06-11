const mysql = require('mysql')

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'carpool'
  })

 db.connect((err) => {
     if(err)
     {
         throw err;
     }
     console.log("Database connected successfuly.");
 });

 module.exports = db;
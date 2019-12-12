var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat"
});

con.connect(function(err) {
  if (err) throw err;
  
  module.exports.exec = function(query){
        con.query(query, (err, res) => {
            if (err) throw err;
        })
    };
});
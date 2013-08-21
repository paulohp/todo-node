var client = require('mysql');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = 'rapido_ware';
var TABLE = 'todos';

var mysql = client.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});


mysql.query('CREATE DATABASE IF NOT EXISTS rapido_ware', function (err) {
    if (err) throw err;
    mysql.query('USE rapido_ware', function (err) {
        if (err) throw err;
        mysql.query('CREATE TABLE IF NOT EXISTS todos('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'content VARCHAR(30),'
            + 'done boolean not null default 0'
            +  ')', function (err) {
                if (err) throw err;
            });
    });
});
var pg = require('pg');

//Owner and password provided for postgres
var connectionString = 'postgres://postgres:abcd1234@localhost:5432/nodejs';

var results = [];
//making connection to the postgres
var client = new pg.Client(connectionString);
client.connect();

//SQL Query > create table
client.query('CREATE TABLE items3(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');

var data = {text: 'sabareesh', complete: false};

// SQL Query > Insert Data
client.query("INSERT INTO items3(text, complete) values($1, $2)", [data.text, data.complete]);

// SQL Query > Select Data
var query = client.query("SELECT * FROM items3 ORDER BY id ASC");

// Stream results back one row at a time
query.on('row', function(row) {
    console.log(row);
    results.push(row);
});

// After all data is returned, close connection and return results
query.on('end', function() {
    console.log('end');
    client.end();
    return results
});
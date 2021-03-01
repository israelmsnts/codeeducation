'use strict';

const express = require('express');

const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'database',
    database: 'contatos',
    port: 3306,
    user: 'MainUser',
    password: 'MainPassword'
});


const path = require('path');
const index = path.join(__dirname, 'static', 'index.html');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.urlencoded({
    extended: true
}))


app.get('/', (req, res) => {
    res.sendFile(index)
});

app.post('/', (req, res) => {
    const name = req.body.name

    pool.query('INSERT INTO pessoas (name) values (?)', [name], function (error, results, fields) {
        if (error) throw error;

        pool.query('select * from pessoas', function (error, results, fields) {
            if (error) throw error;
            const html = `
            <h1>Full Cycle Rocks!</h1>
            ${results.map(p => '- ' + p.name).join('<br>')}
            `
            res.send(html)
        });

    });

});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
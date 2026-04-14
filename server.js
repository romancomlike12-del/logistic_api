const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qaz.30062009.',
    database: 'logistic_company' // Оновив назву бази тут
});

db.connect(err => {
    if (err) return console.error('Помилка підключення: ' + err.message);
    console.log('Успішно підключено до бази logistic_company!');
});

// GET — список транспорту
app.get('/transport', (req, res) => {
    db.query('SELECT * FROM transport', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// POST — додати вантаж
app.post('/cargo', (req, res) => {
    const { description, weight, client_id } = req.body;
    const sql = 'INSERT INTO cargo (description, weight, client_id) VALUES (?, ?, ?)';
    db.query(sql, [description, weight, client_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Вантаж додано!', id: result.insertId });
    });
});

app.listen(3000, () => console.log('Сервер працює: http://localhost:3000'));
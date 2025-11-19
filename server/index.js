const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Get all invoices (summary)
app.get('/api/invoices', (req, res) => {
    const sql = 'SELECT id, invoiceNumber, date, receiverName, totalAmount, createdAt FROM invoices ORDER BY createdAt DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get single invoice by ID
app.get('/api/invoices/:id', (req, res) => {
    const sql = 'SELECT * FROM invoices WHERE id = ?';
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Invoice not found' });
            return;
        }
        // Parse the JSON data field
        try {
            row.data = JSON.parse(row.data);
        } catch (e) {
            // keep as string if parse fails
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Create new invoice
app.post('/api/invoices', (req, res) => {
    const { invoiceNumber, date, receiverName, totalAmount, data } = req.body;
    const sql = 'INSERT INTO invoices (invoiceNumber, date, receiverName, totalAmount, data) VALUES (?,?,?,?,?)';
    const params = [invoiceNumber, date, receiverName, totalAmount, JSON.stringify(data)];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: {
                id: this.lastID
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const pool = require('./db'); // Import the pool from the db.js file

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
    res.send('Server is running');
});

// CREATE
router.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *;",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// READ ALL
router.get('/todos', async (req, res) => {
    try {
        const allTodo = await pool.query("SELECT * FROM todo;");
        res.json(allTodo.rows);
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// READ ONE
router.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1;", [id]);

        if (todo.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// UPDATE
router.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatedTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE id = $2 RETURNING *;",
            [description, id]
        );

        if (updatedTodo.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(updatedTodo.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// DELETE
router.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await pool.query("DELETE FROM todo WHERE id = $1 RETURNING *;", [id]);

        if (deletedTodo.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(deletedTodo.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

const express = require('express');
const pool = require('./db'); // Import the pool from the db.js file

const router = express.Router();

// Health check
router.get('/', (req, res) => {
    res.send('Server is running');
});


///////   MEMBERS ROUTES    ///////

// CREATE a member
router.post('/members', async (req, res) => {
    try {
        const { name, university, subject, hall, hsc_batch, union_pourasava, email, phone, fb_profile, blood_group, level } = req.body;
        const newMember = await pool.query(
            "INSERT INTO Member (name, university, subject, hall, hsc_batch, union_pourasava, email, phone, fb_profile, blood_group, level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;",
            [name, university, subject, hall, hsc_batch, union_pourasava, email, phone, fb_profile, blood_group, level]
        );

        res.json(newMember.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// READ ALL members
router.get('/members', async (req, res) => {
    try {
        const allMembers = await pool.query("SELECT * FROM Member ORDER BY id ASC;");
        res.json(allMembers.rows);
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// READ ONE member
router.get('/members/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const member = await pool.query("SELECT * FROM Member WHERE id = $1;", [id]);

        if (member.rows.length === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.json(member.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a member
router.put('/members/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, university, subject, hall, hsc_batch, union_pourasava, email, phone, fb_profile, blood_group, level } = req.body;
        const updatedMember = await pool.query(
            "UPDATE Member SET name = $1, university = $2, subject = $3, hall = $4, hsc_batch = $5, union_pourasava = $6, email = $7, phone = $8, fb_profile = $9, blood_group = $10, level = $11 WHERE id = $12 RETURNING *;",
            [name, university, subject, hall, hsc_batch, union_pourasava, email, phone, fb_profile, blood_group, level, id]
        );

        if (updatedMember.rows.length === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.json(updatedMember.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// DELETE a member
router.delete('/members/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMember = await pool.query("DELETE FROM Member WHERE id = $1 RETURNING *;", [id]);

        if (deletedMember.rows.length === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.json(deletedMember.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: error.message });
    }
});



///////    EVENTS ROUTES   ///////

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
        const allTodo = await pool.query("SELECT * FROM todo ORDER BY id DESC;");
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

const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Import the routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to access req.body and get json data

// Use the routes defined in routes.js
app.use('/', routes);

const port = 5000;
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});

module.exports = { app, server }; // Export both the app and the server

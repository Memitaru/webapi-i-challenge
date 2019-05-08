// implement your API here

const express = require('express');
const db = require('./data/db.js');
const server = express();
const { users } = db;

server.use(express.json());

// Get Request

server.get('/api/users', (req, res) => {
    users.find()
        .then(allUsers => {
            res.send(allUsers);
        })
        .catch(err => {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        })
})

// Listening

server.listen(9000, () => {
    console.log("Listening on port 9000")
})
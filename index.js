// implement your API here

const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

// Base get request

server.get('/', (req, res) => {
    res.send('Successful get request')
})

// Get Users

server.get('/api/users', (req, res) => {
    db.find()
        .then(allUsers => {
            if (allUsers) {
                res.status(200).json(allUsers)
            } else {
                res.status(404).json({message: "No users added yet."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The users information could not be retrieved."})
        })
})

// Listening

server.listen(9000, () => {
    console.log("Listening on port 9000")
})
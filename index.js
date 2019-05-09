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

// Get user by id

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    
        db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else{
                res.status(404).json({error: "The user with the specified ID does not exist."})
            }
            
        })
        .catch(err => {
            res.status(500).json({error: "The user information could not be retrieved."})
        })
    
})

// Post a User

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    if (newUser.name && newUser.bio) {
        db.insert(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({error: "There was an error while saving the user object to the database."})
            })
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
})



// Listening

server.listen(9000, () => {
    console.log("Listening on port 9000")
})
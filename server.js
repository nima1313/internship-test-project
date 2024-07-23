const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./connectDB');
const config = require('./config.json');
const schemas = require('./schemas');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

connectDB(); //connect to the database
db = mongoose.connection;

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle log submission
app.post('/submit-log',giveID, (req, res) => {
    const sensorAuthToken = req.body.sensorAuthToken;

    // Verify token
    console.log("token verification step")
    if (sensorAuthToken !== config.sensorAuthToken) {
        return res.status(403).json({ error: 'Invalid token' });
    }
    // Log model
    const newLog = {
        id: req.body.id,
        time: req.body.log.time,
        temperature:req.body.log.temperature, 
        sensorID: req.body.log.sensorID
    };
    // Validate log schema
    const { error } = schemas.logSchema.validate(newLog);
    if (error) {
        return res.status(403).json({ error: 'Invalid log format' });
        res.end;
    }

    // Insert log into the database
    console.log("insertion step")
    db.collection('logsDatabase').insertOne(newLog)
        .then(() => res.status(200).json({ message: 'Log saved successfully' }))
        .catch(err => res.status(500).json({ error: 'Error saving log to database' }));
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the usersDatabase collection
        
        const user = await db.collection('userDatabase').findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username' });
        }
        // Check password
        bcrypt.hash(password, config.passwordSalt)

        await console.log(password,user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // Generate token
        const token = jwt.sign({ id: user._id }, config.authSecretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



function giveID(req, res, next) {
    req.body.id = uuidv4();
    next();
}
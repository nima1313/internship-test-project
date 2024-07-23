const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { userSchema, sensorSchema } = require('./schemas');
const connectDB = require('./connectDB');
const mongoose = require('mongoose');
const config = require('./config.json');

// Create users
const user1 = {
    id: uuidv4(),
    username: 'userOne',
    password: 'password123',
    email: 'userone@example.com'
};

const user2 = {
    id: uuidv4(),
    username: 'userTwo',
    password: 'password456',
    email: 'usertwo@example.com'
};

// Create sensors
const sensor1 = {
    id: uuidv4(),
    sensorName: 'tempSensor2005',
    userId: user1.id
};

const sensor2 = {
    id: uuidv4(),
    sensorName: 'tempSensor2001',
    userId: user1.id
};

const sensor3 = {
    id: uuidv4(),
    sensorName: 'tempSensor2001',
    userId: user2.id
};

// Function to hash passwords
async function hashPassword(password) {
    const salt = config.passwordSalt; // Read salt from config.json
    bcrypt.hash()
    return await bcrypt.hash(password, salt);
}

// Function to insert data into the database
async function insertData() {
    try {
        await connectDB();
        const db = mongoose.connection;

        const userCollection = db.collection('userDatabase');
        const sensorCollection = db.collection('sensorDatabase');

        // Validate and insert users
        const users = [user1, user2];
        for (const user of users) {
            const { error } = userSchema.validate(user);
            if (error) {
                console.error(`Validation error for user ${user.username}:`, error);
            } else {
                user.password = await hashPassword(user.password); // Encrypt password
                await userCollection.insertOne(user);
                console.log(`User ${user.username} inserted.`);
            }
        }

        // Validate and insert sensors
        const sensors = [sensor1, sensor2, sensor3];
        for (const sensor of sensors) {
            const { error } = sensorSchema.validate(sensor);
            if (error) {
                console.error(`Validation error for sensor ${sensor.sensorName}:`, error);
            } else {
                await sensorCollection.insertOne(sensor);
                console.log(`Sensor ${sensor.sensorName} inserted.`);
            }
        }
    } catch (error) {
        console.error('Error inserting data into the database:', error);
    }
}

// Insert the validated data into the database
insertData();

module.exports = { user1, user2, sensor1, sensor2, sensor3 };

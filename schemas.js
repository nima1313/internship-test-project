const Joi = require('joi');

// User Database Schema
const userSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required()
});

// Sensor Database Schema
const sensorSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
    sensorName: Joi.string().min(3).max(50).required(),
    userId: Joi.string().guid({ version: 'uuidv4' }).required()
});

// Log Database Schema
const logSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
    time: Joi.date().iso().required(),
    temperature: Joi.number().required(),
    sensorID: Joi.string().guid({ version: 'uuidv4' }).required()
});

module.exports = {
    userSchema,
    sensorSchema,
    logSchema
};
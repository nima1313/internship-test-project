const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./connectDB');

connectDB();
db = mongoose.connection;

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());






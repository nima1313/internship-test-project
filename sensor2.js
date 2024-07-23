const axios = require('axios');

const sensorName = 'tempSensor2001';
const userId = "61e9731a-6f83-4b13-a2e6-1ec691b4641e";
const sensorAuthToken = "An0th3r#S3cureK3y!@56AaauenDdEeFfGgHhIiJjKkLl";
const sensorId = "c2537564-1ead-42d3-ac4f-1d049013ff74";


// Function to generate random temperature between 10 and 40
function getRandomTemperature() {
    return Math.floor(Math.random() * 31) + 10;
}

// Function to send log
function sendLog() {
    const log = {
        time: new Date().toISOString(),
        temperature: getRandomTemperature(),
        sensorID: sensorId,
    };

    axios.post('http://localhost:3000/submit-log', {
        sensorAuthToken,
        log
    }).then(response => {
        console.log('Log submitted successfully:', response.data);
    }).catch(error => {
        console.error('Error submitting log:', error.response ? error.response.data : error.message);
    });
}

// Send a log every 5 seconds
setInterval(sendLog, 5000);
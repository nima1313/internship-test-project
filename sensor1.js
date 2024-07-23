const axios = require('axios');

const sensorName = 'tempSensor2005';
const userId = "61e9731a-6f83-4b13-a2e6-1ec691b4641e";
const sensorAuthToken = "An0th3r#S3cureK3y!@56AaauenDdEeFfGgHhIiJjKkLl";
const sensorId = "14af68c7-886d-4b58-8b61-8a478e33fb28";

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
const axios = require('axios');

const sensorName = 'tempSensor2001';
const userId = "8d5c7bd4-aba6-488d-8454-0e2528615332";
const sensorAuthToken = "An0th3r#S3cureK3y!@56AaauenDdEeFfGgHhIiJjKkLl";
const sensorId = "39cf6536-49f2-479e-bd76-860c1240d9dc";


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
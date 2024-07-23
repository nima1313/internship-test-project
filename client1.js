const axios = require('axios');

const username = "userOne";
const password = 'password123';
const email = 'userone@example.com';

const token = "";


async function authenticate(username, password) {
    try {
        const response = await axios.post('http://localhost:3000/login', { username, password });
        const { token } = response.data;
        console.log('Authentication successful.');
        return token;
    } catch (error) {
        console.error('Authentication failed:', error.response ? error.response.data : error.message);
        return null;
    }
}

authenticate(username, password).then(token => {
    if (token) {
        // Use the token for subsequent requests
        console.log('Token:', token);
    }
});
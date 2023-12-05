const axios = require('axios');
const axiosInstance = axios.create({
    // baseURL: process.env.environment === 'dev' ? 'http://sifuse.test/api/' : 'http://138.68.43.103/api/',
    baseURL: 'http://138.68.43.103/api/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default axiosInstance;

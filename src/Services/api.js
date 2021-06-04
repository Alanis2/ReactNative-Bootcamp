import axios from 'axios';

//key 321f7d53d338f11b8f53238748d3011dea955861

// base url: https://api-ssl.bitly.com/v4/shorten

export const key = '321f7d53d338f11b8f53238748d3011dea955861';

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
    }
})

export default api;
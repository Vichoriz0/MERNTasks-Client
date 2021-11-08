import axios from 'axios';

const axiosClt = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export default axiosClt;
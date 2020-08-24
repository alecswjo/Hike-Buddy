import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
    //Using ngrok. NEED TO USE NEW URL AFTER 8 HOURS
    baseURL: 'http://7654f039.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance; 
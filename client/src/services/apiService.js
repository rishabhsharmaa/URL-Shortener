import axios from 'axios';
import API_BASE_URL from './config';

export const createShortUrl = async (longUrl, token = null) => {
    try {
        const config = {};
        if (token) {
            config.headers = { Authorization: `Bearer ${token}` };
        }
        const response = await axios.post(`${API_BASE_URL}/api/shorten`, { longUrl: longUrl }, config);
        return response.data;
    } catch (err) {
        console.error('API error, failed to create short Url!', err);
        if (err.response && err.response.data) throw err.response.data;
        else throw new Error('Something went wrong, please try again!');
    }
};

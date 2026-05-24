import axios from 'axios';
import API_BASE_URL from './config';
// then change the post call to:
const response = await axios.post(`${API_BASE_URL}/api/shorten`, { longUrl }, config);
/**
 * @desc    Sends a long URL to the backend API to be shortened.
 * @param   {string} longUrl The URL that the user wants to shorten.
 * @returns {Promise<object>} A promise that resolves to the data returned from the API.
 *          On success, this will be an object like: { success: true, data: { ...urlObject } }.
 *          On failure, the promise will be rejected with an error object.
 */


export const createShortUrl = async (longUrl, token = null) => {
    try {
        const config = {};
        if (token) {
            config.headers = { Authorization: `Bearer ${token}` };
        }
        const response = await axios.post(`${API_BASE_URL}/api/shorten`, { longUrl }, config);
        return response.data;
    } catch (err) {
        console.error('API error, failed to create short Url!', err);
        if (err.response && err.response.data) throw err.response.data;
        else throw new Error('Something went wrong, please try again!');
    }
};

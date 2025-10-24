import axios from 'axios';
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
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        // sends http request to backend to shorten the longUrl through axios
        const response = await axios.post('/api/shorten', { longUrl }, config);

        // returning the shortened url
        return response.data;
    } catch (err) {
        console.error('API error, failed to create short Url!', err);
        // more specific way to throw error
        if (err.response && err.response.data) {
            throw err.response.data;
        } else {
            // if error is of something else then throw this error
            throw new Error('Something went wrong, please try again!');
        }
    }
};
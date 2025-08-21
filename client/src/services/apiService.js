import axios from 'axios';
/**
 * @desc    Sends a long URL to the backend API to be shortened.
 * @param   {string} longUrl The URL that the user wants to shorten.
 * @returns {Promise<object>} A promise that resolves to the data returned from the API.
 *          On success, this will be an object like: { success: true, data: { ...urlObject } }.
 *          On failure, the promise will be rejected with an error object.
 */

export const createShortUrl = async (longUrl)=>{
    try{
        const response = await axios.post('/api/shorten',{longUrl});

        return response.data;
    }
    catch(err){
        console.error('API error , failed to create short Url!',err);
        if(err.response && err.response.data){
            throw err.response.data;
        }
        else{
            throw new err('something went wrong,please try again!');
        }
    }
};
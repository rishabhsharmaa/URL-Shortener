import axios from 'axios';

const API_URL = '/api/links/my-links';


/**
 * @desc    Fetches all links associated with the currently authenticated user.
 * @param   {string} token The JSON Web Token for authentication.
 * @returns {Promise<object>} A promise that resolves to the API response data.
 * @throws  Will throw an error if the API request fails.
 */

export const getUserLinks = async (token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.get(API_URL,config);
        return response.data;
    }
    catch(err){
        console.error('Error fetching user links:', err);
        if(err.response && err.response.data){
            throw err.response.data;
        }
        else{
            throw new Error('Unexpected error occurred while fetching user links.');
        }
    }
}

import axios from 'axios';

const API_URL = '/api/auth/';

/**
 * @desc    Registers a new user by sending their data to the backend.
 * @param   {object} userData An object containing { name, email, password }.
 * @returns {Promise<object>} A promise that resolves to the data returned from the API.
 *          On success, this will be the new user object and a token.
 *          On failure, the promise will be rejected with an error object.
 */
export const registerUser = async (userData)=>{
    try{
        const response =  await axios.post(API_URL + 'register',userData);
        return response.data;

    }
    catch(err){

        console.error('API error , failed to register user!',err);
        if(err.response && err.response.data){
            throw err.response.data;
        }
        else{
            throw new Error('Something went wrong during registration. Please try again.');
        }
    }
}

/**
 * @desc    Logs in a user by sending their credentials to the backend.
 * @param   {object} credentials An object containing { email, password }.
 * @returns {Promise<object>} A promise that resolves to the data returned from the API.
 *          On success, this is critically important: it will contain the JWT.
 *          On failure, the promise will be rejected with an error object.
 */

export const loginUser = async (credentials)=>{
    try{
        const response = await axios.post(API_URL+'login',credentials);
        return response.data;
    }
    catch(err){
        console.error('api error , failed to login user!',err);
        if(err.response && err.response.data){
            throw err.response.data;

        }
        else{
            throw new Error('something went wrong during login. Please try again.');

        }
    }
}
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {registerUser} from '../services/authService';
const RegisterPage = ()=>{
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    });

    const [error, setError]=useState('');
    const [success,setSuccess]=useState('');
    
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        setError('');
        setSuccess('');
        
        if(!formData.name ||!formData.email ||!formData.password){
            setError('All Fields are Required');
            return;
        }

        try{
            const response = await registerUser(formData);
            console.log('Registration Successful:', response);
            setSuccess('Registration Succerssful! You can login now.')
            setFormData({
                name:'',
                email:'',
                password:''
            });

        }
        catch(err){
            const errorMessage = err.error|| 'Registration Failed. Please try again.';
            setError(errorMessage);
            console.error('Registration Failed:', err);
        }
    }
    return(
        <div className='auth-container'>
            <h2>Register Page</h2>
            <p>This is the Registeration Page!</p>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name' >Name:</label>
                    <input 
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Enter your name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email' >Email:</label>
                    <input 
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password' >Password:</label>
                    <input 
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Choose a strong password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type='submit'className='btn'>Register</button>
          
           
            </form>
                  {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                  {success && <p className='success-message' style={{ color: 'green' }}>{success}</p>}
            <p className='auth-switch'>
                Already have an account? <Link to ='/login'>Login here</Link>

            </p>
        </div>
    );
    
};

export default RegisterPage;
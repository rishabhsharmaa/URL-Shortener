import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const LoginPage = ()=>{

    const [formData,setFormData]=useState({
        email:'',
        password:''
    });

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault,
        console.log('login with : ',formData)
    }
    return(
        <div className='auth-container'>
            <h2>Login Page</h2>
            <p>This is the Login Page!</p>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email' >Email:</label>
                    <input 
                    type='email'
                    id='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='form-group' >
                    <label htmlFor='password' >Password:</label>
                    <input 
                    type='password'
                    id='password'
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type='submit'className='btn'>Login</button>
            </form>
            <p className='auth-switch'>
                Don't have an account? <Link to ='/register'>Register Now</Link>
            </p>
        </div>

    );
};

export default LoginPage;
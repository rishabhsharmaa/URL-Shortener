import React,{useState} from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = ()=>{
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    });
    
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault(),
        console.log('register with : ',formData);
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
            <p className='auth-switch'>
                Already have an account? <Link to ='/login'>Login here</Link>

            </p>
        </div>
    );
};

export default RegisterPage;
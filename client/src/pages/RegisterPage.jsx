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
    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white p-8 mt-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-2">Register Page</h2>
                <p className="text-center text-slate-500 mb-6">Create your account below.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Choose a strong password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700">Register</button>
                </form>

                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                {success && <p className="mt-4 text-center text-green-600">{success}</p>}

                <p className="auth-switch text-center mt-6 text-slate-500">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
    
};

export default RegisterPage;
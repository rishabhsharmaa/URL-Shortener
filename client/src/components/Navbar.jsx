import React from 'react';
import {Link,useNavigate}  from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';


const Navbar = ()=>{
        const {isAuthenticated,logout}=useAuth();
        const navigate = useNavigate();

        const handleLogout =()=>{
            logout();
            navigate('/login');
        }   
        return(
        <nav className='navbar'>
            <div className='navbar-brand'>
                <Link to='/' >Short.ly</Link>
            </div>
            <ul className='navbar-links'>
                {isAuthenticated ? (
                    <>
                    <li><Link to ='/dashboard'>Dashboard</Link></li>
                    <li><button onClick={handleLogout} className='btn-logout-nav'></button></li>
                    </>
                )
                :(
                    <>
                    <li><Link to ='/login'>Login</Link></li>
                    <li><Link to ='/register'>Register</Link></li>
                    </>
                )
                }
            </ul>
        </nav>
    )
}

export default Navbar;
import React from "react";
import {useAuth} from '../context/AuthContext.jsx';
import { useNavigate } from "react-router-dom";

const DashboardPage = ()=>{
    const {logout}=useAuth();
    const navigate=useNavigate();

    const handleLogout=()=>{
        logout();
        navigate('/login');    
    }

    return(
        <div className="dashboard-container">
            <h2>Dashboard Page</h2>
            <p>Welcome to your personalDashboard , here you will see all the links you have created</p>
            <div className="links-list-placeholder">
                <p>Your shortened links will appear here.</p>
            </div>           
            <button onClick={handleLogout} className="btn btn-logout" style={{margin:'2rem'}}>
                Logout
            </button>
        </div>
    )

};

export default DashboardPage;

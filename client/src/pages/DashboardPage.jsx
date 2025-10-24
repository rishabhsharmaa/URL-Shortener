import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { getUserLinks } from '../services/linkService';


const DashboardPage = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const[isCopiedLink,setIsCopiedLink]=useState(null);

  const handleCopy = async (url,linkid) => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopiedLink(linkid);
      setTimeout(()=>{
        setIsCopiedLink(null);

      },2000);
    } catch (err) {
      console.error('copy to clipboard Failed', err);
      alert('failed to copy to clipboard');
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        if (token) {
          const response = await getUserLinks(token);
          setLinks(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch links:', err);
        // Better error handling for the message
        const errorMessage = err.response?.data?.error || 'Could not load your links.'; 
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>My Dashboard</h2>
      <p>Welcome! Here are all the links you have created.</p>

      <div className="links-list-container" style={{ marginTop: '2rem' }}>
        {isLoading ? (
          <p>Loading your links...</p>
        ) : error ? (
          <p className="error-message" style={{ color: 'red' }}>
            Error: {error}
          </p>
        ) : links.length > 0 ? (
          <table className="links-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #333' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Original URL</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Short URL</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Clicks</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Action</th> 
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px', wordBreak: 'break-all' }}>
                    <a href={link.longUrl} title={link.longUrl} target="_blank" rel="noopener noreferrer">
                      {link.longUrl.substring(0, 50)}...
                    </a>
                  </td>
                  <td style={{ padding: '8px' }}>
                    <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
                      {link.shortUrl}
                    </a>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>{link.clicks}</td>
                  <td style={{ padding: '8px' }}>
                    
                    <button className="btn btn-copy" onClick={() => handleCopy(link.shortUrl,link._id)}>
                      {isCopiedLink===link._id ? 'copied!':'copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You haven't created any short links yet. Go to the homepage to create your first one!</p>
        )}
      </div>

      <button onClick={handleLogout} className="btn btn-logout" style={{ marginTop: '2rem' }}>
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;

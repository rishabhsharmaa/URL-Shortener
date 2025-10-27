import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { getUserLinks } from '../services/linkService';

import Spinner from '../components/spinner';
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
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Dashboard</h2>
        <button onClick={handleLogout} className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-md font-semibold">
          Logout
        </button>
      </div>
      
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center"><Spinner /></div>
        ) : error ? (
          <p className="p-6 text-red-500">Error: {error}</p>
        ) : links.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 font-semibold">Original URL</th>
                <th className="p-4 font-semibold">Short URL</th>
                <th className="p-4 font-semibold text-center">Clicks</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link._id} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="p-4 max-w-xs truncate">
                    <a href={link.longUrl} title={link.longUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {link.longUrl}
                    </a>
                  </td>
                  <td className="p-4">
                    <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-mono hover:underline">
                      {link.shortUrl}
                    </a>
                  </td>
                  <td className="p-4 text-center font-semibold">{link.clicks}</td>
                  <td className="p-4">
                    <button onClick={() => handleCopy(link.shortUrl, link._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md">
                      {isCopiedLink === link._id ? 'Copied!' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-6 text-center text-slate-500">You haven't created any links yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

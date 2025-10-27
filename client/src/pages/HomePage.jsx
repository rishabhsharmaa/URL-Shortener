import React, { useState } from 'react';
import { createShortUrl } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/spinner';

const HomePage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrlData, setShortUrlData] = useState(null);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const [isCopy , setIsCopy]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const handleCopy = async()=>{
    if(!shortUrlData){
        return;
      }
    try{ 
      await navigator.clipboard.writeText(shortUrlData.shortUrl);
      setIsCopy(true);

      setTimeout(()=>{
        setIsCopy(false);
      },2000);
    }
    catch(err){
      console.error('copy to clipboard failed',err);
      alert("failed to copy to clipboard");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl) {
      setError('Please enter a URL to shorten.');
      setShortUrlData(null);
      return;
    }
    setIsLoading(true);
    try {
      setError('');
      const response = await createShortUrl(longUrl, token);
      setShortUrlData(response.data);

    } catch (err) {
      const errorMessage = err.error || 'An unexpected error occurred.';
      setError(errorMessage);
      setShortUrlData(null);
      console.error('Error from API:', err);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-ato text-center">
      <h1 className="text-4xl font-bold mb-2">URL Shortener</h1>
      <p className="text-lg text-slate-600">Enter a long URL to make it short and easy to share!</p>
    
      <form onSubmit={handleSubmit}>
        <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
          <label htmlFor="longUrl-input">Your Long URL:</label>
          <input
            id="longUrl-input"
            type="url"
            placeholder="https://example.com/very/long/url/to/shorten"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus ring-blue-500 disabled:opacity-50"
          />
        </div>
        <button 
        type="submit" 
        disabled={isLoading} 
        className="bg-blue-600 text-white p-3 rounded-md font0semibold hover:bg-blue-700 disabled:bg-blue-400 w-full sm:w-auto">
          {isLoading ? <Spinner size = 'small'/> : 'Shorten'}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 text-red-500">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {shortUrlData && (
        <div className="mt-6 pt-6 border-t text-left">
          <h3>Your Short URL is ready!</h3>

            <div className = "flex justify-between items-center bg-slate-100 p-3 rounded-md">
             <p className="font-bold text-4xl">
            <strong>Short Link :</strong>
             
            </p>
            <a 
              href={shortUrlData.shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-blue-600 break-all"
            >
              {shortUrlData.shortUrl}
            </a>
            <button type="button" className='bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-md text-sm font-semibold ml-4' onClick={handleCopy}>
              {isCopy ? "Copied!":"copy"}
            </button>
          </div>
          <p className="font-sm text-gray-600 mt-2">
            Original URL: {shortUrlData.longUrl.substring(0, 70)}...
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;


import React, { useState } from 'react';
import { createShortUrl } from '../services/apiService';

const HomePage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrlData, setShortUrlData] = useState(null);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl) {
      setError('Please enter a URL to shorten.');
      setShortUrlData(null);
      return;
    }

    try {
      setError('');
      const response = await createShortUrl(longUrl);
      setShortUrlData(response.data);
    } catch (err) {
      const errorMessage = err.error || 'An unexpected error occurred.';
      setError(errorMessage);
      setShortUrlData(null);
      console.error('Error from API:', err);
    }
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <p>Enter a long URL to make it short and easy to share!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="longUrl-input">Your Long URL:</label>
          <input
            id="longUrl-input"
            type="url"
            placeholder="https://example.com/very/long/url/to/shorten"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Shorten</button>
      </form>
      
      {error && (
        <div className="error-container" style={{ color: 'red', marginTop: '1rem' }}>
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {shortUrlData && (
        <div className="result-container" style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
          <h3>Your Short URL is ready!</h3>
          <p>
            <strong>Short Link:</strong> 
            
            <a 
              href={shortUrlData.shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: '#007bff' }}
            >
              {shortUrlData.shortUrl}
            </a>
          </p>
          <p style={{ fontSize: '0.8rem', color: '#555' }}>
            Original URL: {shortUrlData.longUrl.substring(0, 70)}...
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;

import React, { useState } from 'react';
import { createShortUrl } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/spinner';

const HomePage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrlData, setShortUrlData] = useState(null);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const [isCopy, setIsCopy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    if (!shortUrlData) return;
    try {
      await navigator.clipboard.writeText(shortUrlData.shortUrl);
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 2000);
    } catch (err) {
      console.error('Copy to clipboard failed', err);
    }
  };

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
      const errorMessage = err.error || err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      setShortUrlData(null);
      console.error('Error from API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto pt-8 sm:pt-16 pb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
          <span className="text-sm font-medium text-brand-300">Free & open-source URL shortener</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-5">
          Shorten links,{' '}
          <span className="text-gradient">amplify reach</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Transform long URLs into clean, trackable short links. Monitor clicks and analytics in real time with a beautiful dashboard.
        </p>
      </div>

      {/* URL Input Card */}
      <div className="w-full max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        <form onSubmit={handleSubmit}>
          <div className="glass-card p-6 sm:p-8">
            <label htmlFor="longUrl-input" className="block text-sm font-medium text-slate-300 mb-3">
              Paste your long URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="longUrl-input"
                type="url"
                placeholder="https://example.com/your/very/long/url/here"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
                className="input-glass flex-1"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="btn-gradient whitespace-nowrap flex items-center justify-center gap-2 sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Spinner size="small" />
                    <span>Shortening...</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span>Shorten</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-2xl mx-auto mt-4 animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Result Card */}
      {shortUrlData && (
        <div className="w-full max-w-2xl mx-auto mt-6 animate-fade-in-up">
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg text-white">Your short link is ready!</h3>
            </div>

            <div className="flex items-center gap-3 bg-surface-800/60 rounded-xl p-4 border border-white/5">
              <div className="flex-1 min-w-0">
                <a
                  href={shortUrlData.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-mono font-semibold text-gradient-brand hover:opacity-80 transition-opacity break-all"
                >
                  {shortUrlData.shortUrl}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isCopy
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'btn-ghost'
                }`}
              >
                {isCopy ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            <p className="mt-3 text-sm text-slate-500 truncate">
              Original: {shortUrlData.longUrl || shortUrlData.originalUrl}
            </p>
          </div>
        </div>
      )}

      {/* Feature Cards */}
      <div className="w-full max-w-4xl mx-auto mt-20 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              ),
              title: 'Lightning Fast',
              desc: 'Links are generated instantly and redirect in milliseconds.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
                </svg>
              ),
              title: 'Click Analytics',
              desc: 'Track every click with real-time analytics on your dashboard.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              ),
              title: 'Secure & Reliable',
              desc: 'Your links are safe, encrypted, and always available.',
            },
          ].map((feature, i) => (
            <div key={i} className="stat-card text-center group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center text-brand-300 group-hover:bg-brand-500/20 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="font-display font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

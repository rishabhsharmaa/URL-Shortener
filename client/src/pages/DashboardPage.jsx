import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserLinks } from '../services/linkService';
import Spinner from '../components/spinner';

const DashboardPage = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedLinkId, setCopiedLinkId] = useState(null);

  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCopy = async (url, linkId) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLinkId(linkId);
      setTimeout(() => {
        setCopiedLinkId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        if (token) {
          const response = await getUserLinks(token);
          setLinks(response.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch links:', err);
        const errorMessage = err.response?.data?.error || 'Could not load your links. Please try again.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [token]);

  // Derived metrics
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : '0.0';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Your Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage and track your shortened URLs and analytics</p>
        </div>
        <Link to="/" className="btn-gradient flex items-center gap-2 text-sm !py-2.5 !px-5 shadow-lg shadow-brand-500/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Shorten New Link
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Spinner size="large" />
          <p className="text-slate-400 mt-4 animate-pulse">Loading dashboard data...</p>
        </div>
      ) : error ? (
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center max-w-lg mx-auto border border-red-500/20">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">Failed to Load Dashboard</h3>
          <p className="text-slate-400 mt-2 text-sm">{error}</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {/* Stat: Total Links */}
            <div className="glass-card p-6 relative overflow-hidden group hover:border-brand-500/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Links</p>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">{totalLinks}</h3>
                </div>
              </div>
            </div>

            {/* Stat: Total Clicks */}
            <div className="glass-card p-6 relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Clicks</p>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">{totalClicks}</h3>
                </div>
              </div>
            </div>

            {/* Stat: Average Clicks */}
            <div className="glass-card p-6 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg. Clicks / Link</p>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">{avgClicks}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="glass-card overflow-hidden">
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-white">Your Shortened Links</h3>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-white/5">
                {links.length} {links.length === 1 ? 'Link' : 'Links'}
              </span>
            </div>

            {links.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-slate-950/20">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Original Destination</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Shortened Link</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">Clicks</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {links.map((link) => (
                      <tr key={link._id} className="hover:bg-white/[0.02] transition-colors duration-150">
                        {/* Original URL */}
                        <td className="px-6 py-4 max-w-sm sm:max-w-md">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium text-slate-200 truncate" title={link.longUrl}>
                              {link.longUrl}
                            </span>
                            <a
                              href={link.longUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-brand-400 hover:text-brand-300 inline-flex items-center gap-1.5 font-medium hover:underline w-fit"
                            >
                              Visit link
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                          </div>
                        </td>

                        {/* Short URL */}
                        <td className="px-6 py-4 font-mono text-sm">
                          <a
                            href={link.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-white transition-colors hover:underline"
                          >
                            {link.shortUrl}
                          </a>
                        </td>

                        {/* Clicks */}
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-slate-200 border border-white/5">
                            {link.clicks || 0}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleCopy(link.shortUrl, link._id)}
                            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                              copiedLinkId === link._id
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                            }`}
                          >
                            {copiedLinkId === link._id ? (
                              <>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Copied!
                              </>
                            ) : (
                              <>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                                Copy
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center text-center p-12 max-w-md mx-auto py-20">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="9" x2="20" y2="9" />
                    <line x1="4" y1="15" x2="20" y2="15" />
                    <line x1="10" y1="3" x2="8" y2="21" />
                    <line x1="16" y1="3" x2="14" y2="21" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">No links created yet</h3>
                <p className="text-slate-400 text-sm mb-6">
                  You haven't shortened any links using your account yet. Let's create your first branded short URL!
                </p>
                <Link to="/" className="btn-gradient inline-flex items-center gap-2 text-sm !py-2.5 !px-5">
                  Shorten Your First Link
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;

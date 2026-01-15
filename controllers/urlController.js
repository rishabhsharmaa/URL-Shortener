import validUrl from 'valid-url';
import Url from '../models/Url.js';

/**
 * @desc    Create a new short URL
 * @route   POST /api/shorten
 * @access  Public (but tracks user if logged in)
 */
export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ success: false, error: 'Please provide a URL' });
  }

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ success: false, error: 'Invalid URL format provided' });
  }

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.status(200).json({ success: true, data: url });
    }

    const { nanoid } = await import('nanoid');
    const urlCode = nanoid(7);
    const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

    const newUrlData = {
      longUrl,
      shortUrl,
      urlCode,
    };
    
    if (req.user) {
      newUrlData.user = req.user.id;
    }
    
    url = await Url.create(newUrlData);

    res.status(201).json({ success: true, data: url });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

/**
 * @desc    Redirect to original URL from short code
 * @route   GET /:code
 * @access  Public
 */
export const redirectToUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(301, url.longUrl);
    } else {
      return res.status(404).json({ success: false, message: 'No URL found' });
    }

  } catch (err) {
    console.error('Server side problem:', err);
    res.status(500).json({ success: false, message: 'Internal server problem' });
  }
};

// Import the 'valid-url' library
const validUrl = require('valid-url');

// Import the Url model
const Url = require('../models/Url');

/**
 * @desc    Create a new short URL
 * @route   POST /api/shorten
 * @access  Public
 */
const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  // Validate if URL is provided
  if (!longUrl) {
    return res.status(400).json({ success: false, error: 'Please provide a URL' });
  }

  // Validate URL format
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ success: false, error: 'Invalid URL format provided' });
  }

  try {
    // Check if the long URL already exists
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.status(200).json({ success: true, data: url });
    }

    // Generate a short code
    const { nanoid } = await import('nanoid');
    const urlCode = nanoid(7);

    const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

    // Save to database
    url = await Url.create({
      longUrl,
      shortUrl,
      urlCode
    });

    res.status(201).json({ success: true, url });

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
const redirectToUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      // Redirect the user to the long URL
      url.clicks++;

      await url.save();

      return res.redirect(301,url.longUrl)
      

    } else {
      return res.status(404).json({ success: false, message: 'No URL found' });
    }

  } catch (err) {
    console.error('Server side problem:', err);
    res.status(500).json({ success: false, message: 'Internal server problem' });
  }
};

module.exports = {
  shortenUrl,
  redirectToUrl,
};

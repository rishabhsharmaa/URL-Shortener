const validUrl = require('valid-url');
const Url = require('../models/Url');

// The 'redirectToUrl' function remains unchanged below...

/**
 * @desc    Create a new short URL
 * @route   POST /api/shorten
 * @access  Public (but tracks user if logged in)
 */
const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ success: false, error: 'Please provide a URL' });
  }

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ success: false, error: 'Invalid URL format provided' });
  }

  try {
    // --- THIS LOGIC REMAINS MOSTLY THE SAME ---
    // We still check if the URL already exists to avoid duplicates for all users.
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.status(200).json({ success: true, data: url });
    }

    const { nanoid } = await import('nanoid');
    const urlCode = nanoid(7);
    const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

    // --- START OF NEW LOGIC ---

    // Create an object to hold the data for our new URL document.
    const newUrlData = {
      longUrl,
      shortUrl,
      urlCode,
    };
    
    // Check if the auth middleware added a user to the request object.
    // This is the core of our optional authentication.
    if (req.user) {
      // If a user is logged in, add their ID to the data object.
      // req.user.id comes directly from the decoded JWT payload.
      newUrlData.user = req.user.id;
    }
    
    // Create the new URL document in the database using our data object.
    // If req.user existed, the 'user' field will be populated.
    // If not, the 'user' field will be omitted, and Mongoose won't save it.
    url = await Url.create(newUrlData);

    // --- END OF NEW LOGIC ---

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
const redirectToUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      // Redirect the user to the long URL
      url.clicks++;

      await url.save();

      //301 status for permanent redirect
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

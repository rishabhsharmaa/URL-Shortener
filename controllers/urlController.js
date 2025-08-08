// Import the 'valid-url' 
const validUrl = require('valid-url');

// Import the Url model, which gives us access to the database collection.
const Url = require('../models/Url');

/**
 * @desc    This function will be responsible for creating a new short URL.
 * @route   POST /api/shorten
 * @access  Public
 */

const shortenUrl = async (req, res) => {
  // Use object destructuring to get the 'longUrl' property from the request body.
  const { longUrl } = req.body;

  // Basic validation: Check if longUrl was actually provided in the request.
  if (!longUrl) {
    return res.status(400).json({ success: false, error: 'Please provide a URL' });
  }

  // Use the 'valid-url' library to check if the longUrl is a valid URI.
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ success: false, error: 'Invalid URL format provided' });
  }

  try {
    // Check if the long URL already exists in our database.
    let url = await Url.findOne({ longUrl: longUrl });

    // If a URL document was found, return it.
    if (url) {
      return res.status(200).json({ success: true, data: url });
    }

    // import an ES Module into a CommonJS file within an async function.
    const { nanoid } = await import('nanoid');
    
    // Use nanoid to generate a unique string of 7 characters.
    const urlCode = nanoid(7);

    const shortUrl = `${process.env.BASE_URL}/${urlCode}`;
    url = await Url.create({
      longUrl,
      shortUrl,
      urlCode
    })
    res.status(201).json({success : true,url});
    
  

  } catch (err) {
    // If any error occurs during the database operation, we catch it here.
    console.error('Database error:', err);
    
    // Send a 500 Internal Server Error response.
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

/**
 * @desc    Find a URL by its short code and redirect the user.
 * @route   GET /:code
 * @access  Public
 */

const redirectToUrl = async(req,res)=>{
  
  const { code } = req.params;

  res.status(200).json({
    success : true,
    message : "controller redirect is now connected!",
    capturedCode : code,
  })
}

module.exports = {
  shortenUrl,
  redirectToUrl,
};
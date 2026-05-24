import Url from '../models/Url.js';
import crypto from 'crypto';

const generateShortCode = () => {
  return crypto.randomBytes(4).toString('hex');
};

const formatUrlResponse = (url, req) => {
  const host = req.get('host');
  const protocol = req.protocol;
  const shortUrl = `${protocol}://${host}/${url.shortCode}`;
  
  return {
    _id: url._id,
    originalUrl: url.originalUrl,
    longUrl: url.originalUrl,
    shortCode: url.shortCode,
    shortUrl: shortUrl,
    customAlias: url.customAlias,
    userId: url.userId,
    clicks: url.clicks,
    createdAt: url.createdAt,
    updatedAt: url.updatedAt,
  };
};

export const createUrl = async (req, res, next) => {
  try {
    const originalUrl = req.body.originalUrl || req.body.longUrl;
    const { customAlias } = req.body;
    const userId = req.user?.id;

    // Validation
    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: 'Original URL is required',
      });
    }

    // Validate URL format
    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL format',
      });
    }

    // Check if custom alias already exists
    if (customAlias) {
      const existingUrl = await Url.findOne({ customAlias });
      if (existingUrl) {
        return res.status(400).json({
          success: false,
          message: 'Custom alias already in use',
        });
      }
    }

    const shortCode = customAlias || generateShortCode();

    const url = new Url({
      originalUrl,
      shortCode,
      customAlias: customAlias || null,
      userId,
    });

    await url.save();

    res.status(201).json({
      success: true,
      message: 'URL shortened successfully',
      data: formatUrlResponse(url, req),
    });
  } catch (error) {
    next(error);
  }
};

export const getUrl = async (req, res, next) => {
  try {
    const { id } = req.params;

    const url = await Url.findOne({
      $or: [{ _id: id }, { shortCode: id }, { customAlias: id }],
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'URL not found',
      });
    }

    // Increment click counter
    url.clicks += 1;
    await url.save();

    res.json({
      success: true,
      data: formatUrlResponse(url, req),
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUrls = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const urls = await Url.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: urls.length,
      data: urls.map(url => formatUrlResponse(url, req)),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const url = await Url.findById(id);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'URL not found',
      });
    }

    // Check ownership
    if (url.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this URL',
      });
    }

    await Url.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'URL deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};




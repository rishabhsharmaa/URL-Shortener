import Url from '../models/Url.js';
import crypto from 'crypto';

const generateShortCode = () => {
  return crypto.randomBytes(4).toString('hex');
};

export const createUrl = async (req, res, next) => {
  try {
    const { originalUrl, customAlias } = req.body;
    const userId = req.user.id;

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
      data: url,
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
      data: url,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUrls = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const urls = await Url.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: urls.length,
      data: urls,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

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

import Url from '../models/Url.js';

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

export const getLinks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const links = await Url.find({ userId }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: links.length,
      data: links.map(link => formatUrlResponse(link, req)),
    });
  } catch (error) {
    next(error);
  }
};

export const createLink = async (req, res, next) => {
  try {
    const { originalUrl, customAlias } = req.body;
    const userId = req.user.id;
    if (!originalUrl) {
      return res.status(400).json({ success: false, message: 'Original URL is required' });
    }
    try { new URL(originalUrl); } catch {
      return res.status(400).json({ success: false, message: 'Invalid URL format' });
    }
    if (customAlias) {
      const existingLink = await Url.findOne({ customAlias });
      if (existingLink) {
        return res.status(400).json({ success: false, message: 'Custom alias already in use' });
      }
    }
    const url = new Url({ originalUrl, customAlias: customAlias || null, userId });
    await url.save();
    res.status(201).json({ success: true, message: 'Link created successfully', data: formatUrlResponse(url, req) });
  } catch (error) {
    next(error);
  }
};

export const deleteLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const link = await Url.findById(id);
    if (!link) {
      return res.status(404).json({ success: false, message: 'Link not found' });
    }
    if (link.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this link' });
    }
    await Url.findByIdAndDelete(id);
    res.json({ success: true, message: 'Link deleted successfully' });
  } catch (error) {
    next(error);
  }
};

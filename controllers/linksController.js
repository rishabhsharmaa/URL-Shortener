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

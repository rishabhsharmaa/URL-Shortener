import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    customAlias: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Url', UrlSchema);
import mongoose from "mongoose";

const repleSchema = new mongoose.Schema({
  reple: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
  }
}, { collection: 'reples' });

const Reple = mongoose.model('reple', repleSchema);

export { Reple };
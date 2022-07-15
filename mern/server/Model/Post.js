import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  postNum: Number,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  repleNum: {
    type: Number,
    defaut: 0
  }
}, { collection: 'posts' });

const Post = mongoose.model('post', postSchema);

export { Post };
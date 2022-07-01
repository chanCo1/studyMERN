import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { collection: 'posts' });

const post = mongoose.model('post', postSchema);

export { post };
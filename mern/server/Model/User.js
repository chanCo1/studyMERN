import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userNum: Number,
  email: String,
  displayName: String,
  uid: String,
  
}, { collection: 'users' });

const User = mongoose.model('user', userSchema);

export { User };
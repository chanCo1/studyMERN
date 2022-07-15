import express from 'express';

import { Post } from '../Model/Post.js';
import { Reple } from '../Model/Reple.js';
import { User } from '../Model/User.js';

const router = express.Router();

// 댓글 등록
router.post('/submit', (req, res) => {
  let temp = {
    reple: req.body.reple,
    postId: req.body.postId,
  };

  // async await
  (async () => {
    try {
      const userInfo = await User.findOne({ uid: req.body.uid }).exec();
      temp.author = userInfo._id;

      const NewReple = new Reple(temp);

      NewReple.save(() => {
        Post.findOneAndUpdate(
          { _id: req.body.postId }, 
          { $inc: { repleNum: 1 } })
          .exec()
          .then(() => {
            return res.status(200).json({ success: true });
          });
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ success: false });
    }
  })();
});

// 댓글 값 가져오기
router.post('/getReple', (req, res) => {
  (async () => {
    try {
      const repleInfo = await Reple.find( {postId: req.body.postId }).populate('author').exec();

      return res.status(200).json({ success: true, repleList: repleInfo })
    } catch(err) {
      console.error(err);
      return res.status(400).json({ success: false });
    }
  })();
});

router.post('/edit', (req, res) => {
  let temp = {
    postId: req.body.postId,
    reple: req.body.reple,
    uid: req.body.uid,
  };

  (async () => {
    try {
      const reponse = await Reple.findOneAndUpdate(
        {_id: req.body.repleId },
        {$set: temp}
      ).exec();

      return res.status(200).json({ success: true })
    } catch(err) {
      console.error(err);
      return res.status(400).json({ success: false });
    }
  })();
})

export default router;

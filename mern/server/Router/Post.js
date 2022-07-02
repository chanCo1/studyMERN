import express from 'express';
import { Post } from '../Model/Post.js';
import { Counter } from '../Model/Counter.js';

const router = express.Router();


/** submit */
router.post('/submit', (req, res, next) => {
  const temp = req.body;

  (async () => {
    try {
      // find 중괄호에 조건을 걸 수 있음
      const counter = await Counter.findOne({ name: 'counter' }).exec();
      temp.postNum = counter.postNum;
      console.log(temp);

      const CommunityPost = new Post(temp);

      try {
        await CommunityPost.save();

        Counter.updateOne(
          { name: 'counter' }, 
          { $inc: { postNum : 1 } },
        ).then(() => {
          res.status(200).json({ success: true });
        });
      } catch (e) {
        res.status(400).json({ success: false });
      }
    } catch (e) {
      res.status(400).json({ success: false });
    }
  })();
});

/** list */
router.post('/list', (req, res, next) => {
  (async () => {
    try {
      const response = await Post.find().exec();
      res.status(200).json({ success: true, postList: response });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  })();
});

/** detail */
router.post('/detail', (req, res, next) => {
  (async () => {
    try {
      const response = await Post.findOne({ postNum: Number(req.body.postNum) }).exec();
      console.log(response);
      res.status(200).json({ success: true, post: response });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  })();
});

/** edit */
router.post('/edit', (req, res, next) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };

  (async () => {
    try {
      const response = await Post.updateOne(
        { postNum: Number(req.body.postNum) },
        { $set : temp }
      ).exec();
      console.log(response);
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  })();
});

/** delete */
router.post('/delete', (req, res, next) => {
  (async () => {
    try {
      const response = await Post.deleteOne({ postNum: Number(req.body.postNum) }).exec();
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  })();
});


export default router;
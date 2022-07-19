import express from 'express';
import multer from 'multer';

import { Post } from '../Model/Post.js';
import { Counter } from '../Model/Counter.js';
import { User } from '../Model/User.js';

const router = express.Router();

/** submit */
router.post('/submit', (req, res, next) => {
  const temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };

  (async () => {
    try {
      // find 중괄호에 조건을 걸 수 있음
      const counter = await Counter.findOne({ name: 'counter' }).exec();
      temp.postNum = counter.postNum;

      const userInfo = await User.findOne({ uid: req.body.uid }).exec();
      temp.author = userInfo._id;

      const CommunityPost = new Post(temp);

      try {
        await CommunityPost.save();

        Counter.updateOne({ name: 'counter' }, { $inc: { postNum: 1 } }).then(() => {
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
  let sort = {};

  if (req.body.sort === '최신순') {
    sort.createdAt = -1;
  } else {
    sort.repleNum = -1;
  }
  (async () => {
    try {
      const response = await Post.find({
        $or: [
          { title: { $regex: req.body.searchTerm } },
          { content: { $regex: req.body.searchTerm } },
        ],
      })
        .populate('author')
        .sort(sort)
        .exec();

      res.status(200).json({ success: true, postList: response });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  })();

  // Post.find().populate("author").exec().then((doc) => {
  //   res.status(200).json({ success: true, postList: doc });
  // }).catch((err) => {
  //   console.error(err);
  //   res.status(400).json({ success: false });
  // });
});

/** detail */
router.post('/detail', (req, res, next) => {
  (async () => {
    try {
      const response = await Post.findOne({ postNum: Number(req.body.postNum) })
        .populate('author')
        .exec();
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
        { $set: temp }
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
      await Post.deleteOne({ postNum: Number(req.body.postNum) }).exec();
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  })();
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'image/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

// image upload
router.post('/image/upload', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({
        success: true,
        filePath: res.req.file.path,
      });
    }
  });
});

// router.post('.image/upload', setUpload('react-community/post'), (req, res, next) => {
//   console.log(res.req);
//   res.status(200).json({
//     success: true,
//     filePath: res.req.file.location,
//   });
// });

export default router;

// post.js
// // find 중괄호에 조건을 걸 수 있음
// Counter.findOne({ name: 'counter' }).exec().then((counter) => {
//   temp.postNum = counter.postNum;

//   User.findOne({ uid: req.body.uid }).exec().then((userInfo) => {
//     temp.author = userInfo._id;

//     const CommunityPost = new Post(temp);

//     await CommunityPost.save().then(doc => {
//       Counter.updateOne(
//         { name: 'counter' },
//         { $inc: { postNum: 1 } },
//       ).then(() => {
//         res.status(200).json({ success: true });
//       });
//     });
//   });
// }).catch(err => {
//   res.status(400).json({ success: true });
// });

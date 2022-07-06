import express from 'express';

import { Counter } from '../Model/Counter.js';
import { User } from '../Model/User.js';

const router = express.Router();

router.post('/register', (req, res, next) => {
  const temp = req.body;

  (async() => {
    try {
      const counter = await Counter.findOne({ name: 'counter' });
      temp.userNum = counter.userNum;

      const userData = new User(temp);

      try {
        await userData.save();

        counter.updateOne(
          { name: 'counter' },
          { $inc: { userNum: 1 } },
        ).then(() => {
          res.status(200).json({ success: true });
        });
      } catch(e) {
        console.error(e);
        res.status(400).json({ success: false });
      }
    } catch(e) {
      res.status(400).json({ success: false });
    };
  })();

  // const temp = req.body;
  // Counter.findOne({ name: 'counter' })
  //   .then((doc) => {
  //     temp.userNum = doc.userNum;
  //     const userData = new User(temp);

  //     userData.save().then(() => {
  //       Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } }).then(
  //         () => {
  //           res.status(200).json({ success: true });
  //         }
  //       );
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(400).json({ success: false });
  //     });
  // });
});

export default router;

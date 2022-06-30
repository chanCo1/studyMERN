import express from 'express';
import path, { resolve } from 'path';

const app = express();
const port = 4000;

app.use(express.static(path.join(resolve(), '../client/build')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(resolve(), '../client/build'));
});

app.listen(port, () => {
  console.log('* * * * * * * * * * * * * * * * * * *');
  console.log('*   E x p r e s s   S e r v e r !   *');
  console.log('* * * * * * * * * * * * * * * * * * *');
});
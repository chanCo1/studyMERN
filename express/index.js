const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

app.get('*', (req, res) => {
  res.send('안녕하세요!')
});

app.get('/test', (req, res) => {
  res.send('test!')
});

app.listen(port, () => {
  console.log(`Example app listen ${port}!`)
});
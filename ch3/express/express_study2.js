const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8080, () => {
  console.log(app.get('port'), '번 포트에서 서버 실행중 ... ');
});

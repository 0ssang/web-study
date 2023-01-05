const express = require('express');

const app = express();
app.set('port', process.env.PORT || 8080);

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index2.html');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 실행중...');
  console.log(__dirname);
  console.log(process.cwd());
});

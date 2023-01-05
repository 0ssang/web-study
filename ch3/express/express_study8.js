const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// 포트 설정
app.set('port', process.env.PORT || 8080);

// 공통 미들웨어
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(cookieParser('secret@1234')); //암호화된 쿠키를 사용하기 위한 임의의 문자전송
app.use(
  session({
    secret: 'secret@1234', //암호화
    resave: 'false', //새로운 요청 시 세션에 변동 사항이 없어도 다시 저장할지 설정
    saveUninitialized: 'true', //세션에 저장할 내용이 없어도 저장할지 설정
    cookie: {
      httpOnly: true,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우팅 설정
app.get('/', (req, res) => {
  if (req.session.name) {
    const output = `
      <h2>로그인한 사용자님</h2><br>
      <p>${req.session.name}님 안녕하세요.</p><br>
    `;
    res.send(output);
  } else {
    const output = `
      <h2>로그인하지 않은 사용자 입니다.</h2><br>
      <p>로그인 해주세요.</p><br>
    `;
    res.send(output);
  }
});

app.get('/login', (req, res) => {
  console.log(req.session);
  req.session.name = '조영상';
  res.end('Login OK');
});

app.get('/logout', (req, res) => {
  res.clearCookie('connect.sid');
  res.end('Logout OK');
});

// 서버와 포트 연결..
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

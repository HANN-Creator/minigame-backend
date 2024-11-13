const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 최고 점수를 저장할 파일 경로ss
const HIGH_SCORE_FILE = 'high_score.json';

// 최고 점수 불러오기
app.get('/highscore', (req, res) => {
  if (fs.existsSync(HIGH_SCORE_FILE)) {
    const highScore = JSON.parse(fs.readFileSync(HIGH_SCORE_FILE, 'utf8'));
    res.json(highScore);
  } else {
    res.json({ score: 0, nickname: '없음' });
  }
});

// 최고 점수 저장하기
app.post('/highscore', (req, res) => {
  const { score, nickname } = req.body;
  if (typeof score === 'number' && typeof nickname === 'string') {
    const highScore = { score, nickname };
    fs.writeFileSync(HIGH_SCORE_FILE, JSON.stringify(highScore));
    res.json({ message: '최고 점수가 성공적으로 저장되었습니다!' });
  } else {
    res.status(400).json({ error: '잘못된 데이터 형식입니다' });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
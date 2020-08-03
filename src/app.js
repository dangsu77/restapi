const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const bookRouter = require('./routes/book');
const searchRouter = require('./routes/search');
const morgan = require('morgan');
//const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to mongodb server
// const db = mongoose.connection;
// db.on('error', console.error);
// db.once('open', () => {
//   console.log('Connected to mongodb server');
// });
// mongoose.connect('mongodb://localhost/test');

// Cross Origin Resource Sharing
const corOptions = {
  origin: 'http://localhost:3000', // 허락하고자 하는 요청주소
  credentials: true, // true 로 하면 설정한 내용을 response 헤더에 추가해줌
};

app.use(cors(corOptions));
app.use(morgan('dev'));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// set router
app.use('/api', searchRouter);

// Port setting
const port = process.env.PORT || 3000;
console.log('[process.env.PORT]' + process.env.PORT);
app.listen(port, () => {
  console.log('server on! http://localhost:' + port);
});

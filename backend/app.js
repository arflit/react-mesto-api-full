/* Рамиль, здравствуйте.

 Мне не удалось настроить CORS так, чтобы одновременно работали
 и запросы через Postman, и всё корректно было в браузере.
 Проблема в том, что у меня авторизация не через передачу токена, а через куки:
 если в origin у CORS прописать "*" (чтобы пропускало Postman), то браузер
 не готов отправлять куки, выдаёт ошибку. Я не нашёл способа настроить это даже в режиме
 "да плевать на безопасность, пусть просто работает, я понимаю риски".

 Поэтому для Postman я развернул вторую копию API, в точности соответствует первой - за
 исключением того, что там закомментирован CORS.
 Доступно по адресу api2.mesto.flitman.ru.

 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
/* const cors = require('cors');

const corsWhiteList = ['http://mesto.flitman.ru', 'https://mesto.flitman.ru'];

const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    }
  },
  credentials: true,
}; */

const router = require('./routes/index');

const { PORT = 3001 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(limiter);
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
// app.use(cors(corsOptions));
app.use('/', router);

app.listen(PORT, () => {
});

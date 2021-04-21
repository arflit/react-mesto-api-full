const jwt = require('jsonwebtoken');
const ErrorWithStatusCode = require('./error-with-status-code');

// eslint-disable-next-line consistent-return
function auth(req, res, next) {
  if (!(req.cookies.jwt)) {
    next(new ErrorWithStatusCode(401, 'Необходима авторизация'));
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new ErrorWithStatusCode(401, 'Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
}

module.exports = auth;

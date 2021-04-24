const router = require('express').Router();
const { errors, celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { createUser, login, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const errorsHandler = require('../middlewares/errors-handler');
const ErrorWithStatusCode = require('../middlewares/error-with-status-code');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger);
router.use('/crash-test', (req, res) => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 1000);
  res
    .send({ message: 'Сейчас мы упадём!' });
});
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/i),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),

  }),
}), createUser);
router.delete('/signout', auth, signOut);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', (req, res, next) => {
  next(new ErrorWithStatusCode(404, 'Страница не найдена'));
});
router.use(errorLogger);
router.use(errors());
router.use(errorsHandler);

module.exports = router;

module.exports.checkErrCreate = (err) => {
  let status = 500;
  let message = 'На сервере произошла ошибка';
  if (err.name === 'ValidationError') {
    status = 400;
    message = err.message;
  }
  return { status, message };
};

module.exports.checkErrFindUser = (err) => {
  let status = 500;
  let message = 'На сервере произошла ошибка';
  if (err.path === '_id') {
    status = 404;
    message = 'Пользователь не найден';
  }
  return { status, message };
};

module.exports.checkErrFindCard = (err) => {
  let status = 500;
  let message = 'На сервере произошла ошибка';
  if (err.path === '_id') {
    status = 404;
    message = 'Карточка не найдена';
  }
  return { status, message };
};

module.exports.checkErrUpdate = (err) => {
  let status = 500;
  let message = 'На сервере произошла ошибка';
  if (err.name === 'ValidationError') {
    status = 400;
    message = err.message;
  }
  if (err.path === '_id') {
    status = 404;
    message = 'Пользователь не найден';
  }
  return { status, message };
};

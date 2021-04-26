const Card = require('../models/card');

const ErrorWithStatusCode = require('../middlewares/error-with-status-code');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorWithStatusCode(400, err.message));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new ErrorWithStatusCode(404, 'Карточка не найдена');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ErrorWithStatusCode(403, 'Вы пытаетесь удалить чужую карточку');
      }
      return card;
    })
    .then((card) => {
      card.remove();
    })
    .then(() => Card.find({}))
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new ErrorWithStatusCode(404, 'Карточка наконец-то не найдена'))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new ErrorWithStatusCode(404, 'Карточка наконец-то не найдена'))
    .then((card) => res.send(card))
    .catch(next);
};

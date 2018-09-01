const {User} = require('../models/user');

module.exports = {
  authenticate: (req, res, next) => {
    const token = req.header('x-auth');

    User.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject('User not found');
      }

      req.user = user;
      req.token = token;

      next();
    }).catch((err) => {
      res.status(401).send();
    });
  }
};

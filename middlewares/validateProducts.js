const msg = require('../helpers/messages');

module.exports = {
  validateName: (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: msg.NAME_REQUIRED });
    if (name.length < 5) return res.status(422).json({ message: msg.NAME_5_CHARACTERS });

    next();
  },
};

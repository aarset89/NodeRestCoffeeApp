const { validationResult } = require('express-validator');

const fieldsValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

const passwordValidation = (password = '') => {
  if (password) {
    if (password.length < 6) {
      throw new Error('Password must be at least 6 length char');
    }
    return password;
  }
  return password;
};

module.exports = {
  fieldsValidation,
  passwordValidation,
};

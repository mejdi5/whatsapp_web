const { body, validationResult } = require('express-validator');

const registerRules = () => [
  body('firstName', 'First Name is required').notEmpty(),
  body('phoneNumber', 'Phone Number must be a number').isNumeric(),
  body('email', 'email is required').isEmail(),
];

const loginRules = () => [
  body('email', 'email is required').isEmail(),
  body('phoneNumber', 'Phone number is required').notEmpty(),
];

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};

module.exports = { validator, registerRules, loginRules };
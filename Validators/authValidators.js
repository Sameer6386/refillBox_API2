const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("name", "Name is required").notEmpty(),
  check("email", "Email is invalid").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
];

exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

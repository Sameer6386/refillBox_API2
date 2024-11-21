const jwt = require("jsonwebtoken");
exports.genrateToken = (userId) => {
  return jwt.sign({ userId }, process.env.jwt_secret, { expiresIn: "1d" });
};

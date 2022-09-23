const { decodeJwt } = require("../helpers/jwtHelper");

const authorization = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const data = decodeJwt(token);
    req.userId = data.id;
    return next();
  } catch {
    return res.sendStatus(401);
  }
};

module.exports = authorization;

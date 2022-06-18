const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => sign({
  username: user.username,
}, 'secretkeypleasechangeme', {
  expiresIn: '7d',
});

// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  const token = req.cookies['x-access-token'];
  if (!token) {
    var err = new Error("Not authorized! Go back!");
    err.status = 400;
    return res.render("error", {
      pageTitle: "Access Denied",
      errorStatus: err.status,
      errMessage: err
    });
  }
  try {
    const validToken = verify(token, 'secretkeypleasechangeme');
    if (validToken) {
      req.username = validToken.username;
      return next();
    }
  } catch (err) {
    var err = new Error("Not authorized! Go back!");
    err.status = 400;
    return res.render("error", {
      pageTitle: "Access Denied",
      errorStatus: err.status,
      errMessage: err
    });
  }
};

module.exports = {
  createToken,
  verifyToken,
};

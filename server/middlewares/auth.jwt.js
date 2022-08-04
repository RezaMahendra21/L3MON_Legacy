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
    var err = new Error("Unauthorized! Go back!");
    err.status = 401;
    return res.redirect('/login');
  }
  try {
    const validToken = verify(token, 'secretkeypleasechangeme');
    if (validToken) {
      req.username = validToken.username;
      return next();
    }
  } catch (err) {
    var err = new Error("Unauthorized! Go back!");
    err.status = 401;
    return res.redirect('/login');
  }
};

module.exports = {
  createToken,
  verifyToken,
};

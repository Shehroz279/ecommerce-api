const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  //   let token = req.auth("Authorization");
  let authheader = req.header("Authorization");
  let parsedToken = authheader.slice(7);
  jwt.verify(parsedToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      // token is invalid or expired
    } else {
      req.user = decoded;
      next();
      // token is valid, proceed with authentication
    }
  });
};
const isAdminRole = (role) => {
  return (req, res, next) => {
    if (req.user.isAdmin !== role) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient Privileges" });
    }
    next();
  };
};
module.exports = { authenticateToken, isAdminRole };

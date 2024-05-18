const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const verify = promisify(jwt.verify);

const checkAuth = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const decodedToken = await verify(token, process.env.JWT_SECRET);
    if (decodedToken) {
      req.userData = decodedToken;
      next();
    } else {
      return res.status(403).json({ error: "Unauthorized access" });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = checkAuth;

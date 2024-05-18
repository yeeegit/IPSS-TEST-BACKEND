const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    return res.json({
      username: user.username,
      email: user.email,
      profileImage: user.profile_image,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Kullanıcı bilgileri alınamadı: " + error.message });
  }
};

module.exports = getUser;

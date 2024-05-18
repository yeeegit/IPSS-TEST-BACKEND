const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function changeUsername(req, res) {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    const { username: newUsername } = req.body;

    if (!token) return res.status(401).json({ error: "Token not provided" });
    if (!newUsername)
      return res.status(400).json({ message: "Yeni bir isim giriniz." });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = newUsername;
    await user.save();

    res.status(200).json({ message: "Username updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the username" });
  }
}

module.exports = changeUsername;

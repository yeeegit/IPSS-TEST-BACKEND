const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function userPhoto(req, res) {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    const { profileImage: profileImage } = req.body; // Base64

    if (!token) return res.status(401).json({ error: "Token not provided" });
    if (!profileImage) {
      return res.status(400).json({ message: "No image provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profile_image = profileImage;

    await user.save();

    res.status(200).json({ message: "Photo uploaded successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while uploading the photo" });
  }
}

module.exports = userPhoto;

const bcrypt = require("bcrypt");
const User = require("../models/userModel");

async function findUser(_username, _password) {
  try {
    const user = await User.findOne({ username: _username });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(_password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect credentials");
    }
    return user;
  } catch (error) {
    throw new Error("An error occurred while processing your request");
  }
}

module.exports = findUser;

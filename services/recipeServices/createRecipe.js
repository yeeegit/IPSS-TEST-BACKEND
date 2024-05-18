const Recipe = require("../../models/recipeModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createRecipe = async (req, res) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decodedToken.userId);

    const { title, content, image } = req.body;
    console.log(title, content, image);
    const newRecipe = new Recipe({
      title: title,
      content: content,
      image: image,
      writer: userId,
    });
    const savedRecipe = await newRecipe.save();

    res.status(201).json({ success: true, data: savedRecipe });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred while creating the recipe",
    });
  }
};

module.exports = createRecipe;

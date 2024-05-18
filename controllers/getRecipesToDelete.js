const mongoose = require("mongoose");
const Recipe = require("../models/recipeModel");
const jwt = require("jsonwebtoken");

const getRecipesToDelete = async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = new mongoose.Types.ObjectId(decodedToken.userId);

  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const recipes = await Recipe.find({ writer: userId })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalRecipes = await Recipe.countDocuments({ writer: userId });
    const totalPages = Math.ceil(totalRecipes / pageSize);

    return res.status(200).json({
      success: true,
      data: recipes,
      pagination: {
        page,
        pageSize,
        totalRecipes,
        totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error: " + error.message,
    });
  }
};

module.exports = { getRecipesToDelete };

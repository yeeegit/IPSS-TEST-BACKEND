const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Recipe = require("../../models/recipeModel");

const commentRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentContent } = req.body;

    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = new mongoose.Types.ObjectId(decodedToken.userId);

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const newComment = {
      commentContent: commentContent,
      commenter: userId,
      recipe: new mongoose.Types.ObjectId(id),
      createdAt: new Date(),
    };

    recipe.comments.push(newComment);
    await recipe.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while adding comment" });
  }
};

module.exports = commentRecipe;

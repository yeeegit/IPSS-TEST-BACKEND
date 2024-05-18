const Recipe = require("../../models/recipeModel");
const jwt = require("jsonwebtoken");

const likeRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe not found" });
    }

    if (recipe.likes.includes(userId)) {
      return res.json({
        success: false,
        message: "You have already liked this post",
      });
    }

    recipe.likes.push(userId);
    const likeCount = recipe.likes.length;
    await recipe.save();

    res.status(200).json({ success: true, data: likeCount });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred while liking the recipe",
    });
  }
};

module.exports = { likeRecipe };

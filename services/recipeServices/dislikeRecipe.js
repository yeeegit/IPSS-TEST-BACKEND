const Recipe = require("../../models/recipeModel");
const jwt = require("jsonwebtoken");

const dislikeRecipe = async (req, res) => {
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

    if (recipe.dislikes.includes(userId)) {
      return res.json({
        success: false,
        message: "You have already disliked this post",
      });
    }

    recipe.dislikes.push(userId);
    const dislikeCount = recipe.dislikes.length;

    await recipe.save();

    res.status(200).json({ success: true, data: dislikeCount });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred while disliking the recipe",
    });
  }
};

module.exports = { dislikeRecipe };

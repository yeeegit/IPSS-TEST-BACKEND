const Recipe = require("../../models/recipeModel");

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id).populate({
      path: "comments.commenter",
      select: "username profile_image",
    });

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe not found" });
    }

    return res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error: " + error.message,
    });
  }
};

module.exports = { getRecipe };

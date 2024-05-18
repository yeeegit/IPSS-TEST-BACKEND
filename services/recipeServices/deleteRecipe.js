const Recipe = require("../../models/recipeModel");

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe delete operation error" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error: " + error.message,
    });
  }
};

module.exports = { deleteRecipe };

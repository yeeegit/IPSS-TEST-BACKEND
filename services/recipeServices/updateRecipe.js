const Recipe = require("../../models/recipeModel");

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, error: "Title and content are required" });
    }

    const existingRecipe = await Recipe.findById(id);
    if (!existingRecipe) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe not found" });
    }

    existingRecipe.title = title;
    existingRecipe.content = content;
    if (image) {
      existingRecipe.image = image;
    }

    const updatedRecipe = await existingRecipe.save();

    return res.status(200).json({ success: true, data: updatedRecipe });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error: " + error.message,
    });
  }
};

module.exports = updateRecipe;

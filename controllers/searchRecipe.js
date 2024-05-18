const Recipe = require("../models/recipeModel");

const searchRecipe = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const searchTerm = req.query.searchTerm || "";
    const sortBy = req.query.sortBy || "byNewest";

    let recipes;
    let totalRecipes;

    let query = {};

    if (searchTerm !== "") {
      query = {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { content: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    switch (sortBy) {
      case "byLike":
        recipes = await Recipe.find(query)
          .sort({ likes: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize);
        break;
      case "byNewest":
        recipes = await Recipe.find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize);
        break;
      case "byComments":
        recipes = await Recipe.aggregate([
          { $match: query },
          {
            $addFields: {
              commentCount: { $size: "$comments" },
            },
          },
          { $sort: { commentCount: -1 } },
          { $skip: (page - 1) * pageSize },
          { $limit: pageSize },
        ]);
        break;
      default:
        recipes = await Recipe.find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize);
        break;
    }

    totalRecipes = await Recipe.find(query).countDocuments();
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

module.exports = { searchRecipe };

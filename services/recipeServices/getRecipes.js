const Recipe = require("../../models/recipeModel");

const getRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const searchTerm = req.query.searchTerm || "";
    const sortBy = req.query.sortBy || "byNewest";

    let query = {};

    if (searchTerm) {
      query = {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { content: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    let sortOption = { createdAt: -1 };

    switch (sortBy) {
      case "byLike":
        sortOption = { likes: -1 };
        break;
      case "byNewest":
        sortOption = { createdAt: -1 };
        break;
      case "byOldest":
        sortOption = { createdAt: 1 };
        break;
      case "byComments":
        recipes = await Recipe.aggregate([
          { $match: query },
          { $addFields: { commentCount: { $size: "$comments" } } },
          { $sort: { commentCount: -1 } },
          { $skip: (page - 1) * pageSize },
          { $limit: pageSize },
        ]);
        const totalRecipes = await Recipe.countDocuments(query);
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
      default:
        sortOption = { createdAt: -1 };
    }

    const recipes = await Recipe.find(query)
      .sort(sortOption)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalRecipes = await Recipe.countDocuments(query);
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

module.exports = { getRecipes };

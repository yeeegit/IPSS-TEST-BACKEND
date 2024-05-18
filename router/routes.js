const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const userPhoto = require("../services/userPhoto");
const userRegister = require("../services/userRegister");
const userLogin = require("../services/userLogin");
const { getRecipes } = require("../services/recipeServices/getRecipes");
const { getRecipe } = require("../services/recipeServices/getRecipe");
const createRecipe = require("../services/recipeServices/createRecipe");
const updateRecipe = require("../services/recipeServices/updateRecipe");
const { deleteRecipe } = require("../services/recipeServices/deleteRecipe");
const { dislikeRecipe } = require("../services/recipeServices/dislikeRecipe");
const { likeRecipe } = require("../services/recipeServices/likeRecipe");
const commentRecipe = require("../services/recipeServices/commentRecipe");
const changeUsername = require("../services/changeUsername");
const getUser = require("../controllers/getUser");
const { getRecipesToDelete } = require("../controllers/getRecipesToDelete");
const { getRecipesToUpdate } = require("../controllers/getRecipesToUpdate");
const router = express.Router();

router.get("/auth", checkAuth);
router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/get-user", checkAuth, getUser);

router.get("/recipes", getRecipes);
router.get("/recipes-to-delete", getRecipesToDelete);
router.get("/recipes-to-update", getRecipesToUpdate);

router.get("/recipe/:id", getRecipe);
router.post("/create-recipe", checkAuth, createRecipe);
router.put("/update-recipe/:id", checkAuth, updateRecipe);

router.delete("/delete-recipe/:id", checkAuth, deleteRecipe);

router.post("/like-recipe/:id", checkAuth, likeRecipe);
router.post("/dislike-recipe/:id", checkAuth, dislikeRecipe);
router.post("/comment-recipe/:id", checkAuth, commentRecipe);

router.post("/profile-photo", checkAuth, userPhoto);
router.post("/profile-username", checkAuth, changeUsername);

module.exports = router;

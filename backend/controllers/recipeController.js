const ApiError = require("../utils/apiError");
const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res, next) => {
  const { title, ingredients, instructions, cookingTime, imageUrl } = req.body;

  try {
    const recipe = await Recipe.create({
      title,
      ingredients: ingredients.map(item => item.toLowerCase()),
      instructions,
      cookingTime,
      imageUrl,
      createdBy: res.locals.user._id
    });
    if (!recipe) throw new ApiError(500, "Failed to create recipe");
    res.status(201).json({ recipe });
  } catch (e) {
    next(e);
  }
};

exports.getAllRecipes = async (req, res, next) => {
  try {
    const { sort = "desc", title, ingredients } = req.query;
    const cookingTime = +req.query.cookingTime || 0;

    const filter = {};
  // Title search (case-insensitive, partial match)
  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }
  // Filter by ingredients
  if (ingredients) {
    const ingredientArray = ingredients.split(',').map(i => i.trim().toLowerCase());
    filter.ingredients = { $all: ingredientArray };
  }
  // Filter by cooking time
  if (cookingTime) {
    filter.cookingTime = { $lte: Number(cookingTime) };
  }

  const options = {
    page: +req.query.page || 1,
    limit: +req.query.limit || 10,
    sort: { createdAt: sort === "asc" ? 1 : -1 },
    populate: {
        path: "createdBy",
        select: "username"
    }
  };
    const recipes = await Recipe.paginate(filter, options);
    res.json({recipes});
  } catch (e) {
    next(e);
  }
};

exports.getSingleRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'username');
    if (!recipe) throw new ApiError(404, "Recipe not found");
    res.json({recipe});
  } catch (e) {
    next(e);
  }
};

exports.getUserRecipes = async (req, res, next) => {
  try {
  const options = {
    page: +req.query.page || 1,
    limit: +req.query.limit || 10,
    sort: { createdAt: req.query.sort === "asc" ? 1 : -1 },
  };
  const recipes = await  Recipe.paginate({ createdBy: res.locals.user._id }, options);
    res.json({ recipes });
  } catch (e) {
    next(e);
  }
};

exports.updateRecipe = async (req, res, next) => {
  const recipeId = req.params.id;
  const userId = res.locals.user._id;
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, createdBy: userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) throw new ApiError(404, "Error updating recipe");

    res.json({updatedRecipe});
  } catch (e) {
    next(e);
  }
};

exports.deleteRecipe = async (req, res) => {
  const recipeId = req.params.id;
  const userId = res.locals.user._id;
  try {
    const result = await Recipe.deleteOne({ _id: recipeId, createdBy: userId });
    if (result.deletedCount === 0) throw new ApiError(404, "Error deleting recipe");
    res.json({ message: 'Recipe deleted successfully' });
  } catch (e) {
    next(e);
  }
};

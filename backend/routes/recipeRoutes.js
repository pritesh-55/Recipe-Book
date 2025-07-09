const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authentication');
const schemaValidator = require("../middlewares/schemaValidator");
const { createRecipeSchema } = require("./schema/body");
const {
  createRecipe,
  getAllRecipes,
  getSingleRecipe,
  getUserRecipes,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

router.get('/', getAllRecipes);
router.get('/:id', getSingleRecipe);
router.post('/', schemaValidator({ body: createRecipeSchema }), protect, createRecipe);
router.get('/user/my-recipes', protect, getUserRecipes);
router.put('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);

module.exports = router;

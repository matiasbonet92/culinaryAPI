import express from 'express';
import { getRecipes, getRecipesById, getRecipesByCuisine, updateRecipes, createRecipes, deleteRecipes } from '../controllers/recipes.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipesById);
router.get('/cuisine/:cuisine', getRecipesByCuisine);
router.patch('/:id', updateRecipes);
router.post('/', createRecipes);
router.delete('/:id', deleteRecipes);

export default router;
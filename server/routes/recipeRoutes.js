const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const recipeParser = require('../controllers/recipeParser');
const saveController = require('../controllers/recipeDatabase');
router.post(
  '/recipes',
  recipeController.genRecipe,
  recipeParser.parseRecipe,
  (req, res) => {
    console.log('🚀 Sending response to client:', res.locals.response);
    if (!res.locals.response) {
      return res.status(500).json({ error: 'No recipe generated' });
    }

    res.status(200).json(res.locals.response); // ✅ This ensures the response body is not empty
  }
);

module.exports = router;

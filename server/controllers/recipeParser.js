const parseRecipe = async (req, res, next) => {
  const response = res.locals.response;
  console.log('Loggnin ParseRecipe:', response);

  // if it's already a full recipe object (from controller), do nothing
  if (response && response.name && response.ingredients && response.instructions) {
    return next();
  }

  try {
    const parsedRes = JSON.parse(response.content);
    res.locals.response = parsedRes;
    return next();
  } catch (err) {
    console.error('❌ Failed to parse response in recipeParser:', err);
    return res.status(500).json({ error: 'Invalid recipe format from OpenAI' });
  }
};

module.exports = { parseRecipe };

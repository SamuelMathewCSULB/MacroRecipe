// Make sure to store your API key in a .env file, and use process.env to access it
require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const genRecipe = async (req, res, next) => {
  try {
    console.log('📩 Received POST /api/recipes');
console.log('👉 Request body:', req.body);
    const { ingredients, calories, protein, foodType } = req.body;

    const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: 'gpt-4.1-nano',
      temperature: 1,
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: `Generate a detailed recipe using the following:
- Ingredients: ${ingredients}
- Calorie budget: ${calories} calories
- Protein goal: at least ${protein} grams
- Cuisine type: ${foodType}

The response must be a JSON object with the properties:
- name (string)
- ingredients (array of strings)
- instructions (array of strings)

Make the recipe detailed and follow all the provided constraints. DO NOT include objects in the arrays.`,
        },
      ],
    });

    const content = completion.data.choices[0].message.content;
    console.log("Raw GPT content:", content);

    const parsed = JSON.parse(content);
    console.log('🍽 Final parsed recipe:', parsed);
    
    res.locals.response = parsed;
    return next();

  } catch (error) {
    console.error('Error in genRecipe:', error.message);
    return res.status(500).json({ error: 'Failed to generate recipe' });
  }
};



module.exports = {
  genRecipe,
};


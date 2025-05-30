// Make sure to store your API key in a .env file, and use process.env to access it
require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const genRecipe = async (req, res, next) => {
  try {
    const { ingredients } = req.body;
    console.log("Loaded API Key:", process.env.OPENAI_API_KEY);
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: 'gpt-4.1-nano',
      temperature: 1,
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: `Generate me a detailed recipe with the name of the dish, the ingredients and the step by step instructions using these ingredients ${ingredients}. Make sure that the recipe has all the ingredients needed and very elaborate instructions and return it as a JSON object and make sure the the dish name property is ALWAYS called name, the instructions property is ALWAYS called instructions and the ingredients property is ALWAYS called ingredients. Also make sure that the elements in the arrays that you are returning are string and NOT objects`,
        },
      ],
    });
    console.log(completion.data);
   
    const response = completion.data.choices[0].message;
    res.locals.response = response;
    return next();

  } catch (error) {
  if (error.response) {
    // OpenAI API responded with an error
    console.error('OpenAI API Error:', error.response.data);
    return res.status(500).json({ error: error.response.data });
  } else if (error.request) {
    // Request was made but no response
    console.error('No response from OpenAI:', error.request);
    return res.status(500).json({ error: 'No response from OpenAI' });
  } else {
    // Other errors
    console.error('Error in OpenAI request setup:', error.message);
    return res.status(500).json({ error: error.message });
  }
}

};
module.exports = {
  genRecipe,
};


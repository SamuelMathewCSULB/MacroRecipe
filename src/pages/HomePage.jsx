import React, { useState } from 'react';
import './HomePage.css'; // Handles background + styling

function HomePage({ pageRecipe, setpageRecipe }) {
  console.log('✅ HomePage is rendering');
  const [ingredients, setIngredients] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [foodType, setFoodType] = useState('');

  const handleSubmit = async () => {
    console.log('🟡 handleSubmit triggered');
    try {
      const response = await fetch('http://localhost:5001/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients,
          calories,
          protein,
          foodType,
        }),
      });

      const text = await response.text();
      const data = JSON.parse(text);
      console.log('📦 Parsed data:', data);
      setpageRecipe(data);

      // Clear inputs
      setIngredients('');
      setCalories('');
      setProtein('');
      setFoodType('');
    } catch (error) {
      console.error('❌ Error fetching recipe:', error);
    }
  };

  return (
    <div className="homepage-wrapper">
      <h1>AI-Powered Recipe Generator</h1>

      <div>
        <label>Ingredients (comma separated):</label><br />
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>

      <div>
        <label>Calorie Budget:</label><br />
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </div>

      <div>
        <label>Protein Goal (grams):</label><br />
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
      </div>

      <div>
        <label>Type of Cuisine (e.g., Italian, Vegan):</label><br />
        <input
          type="text"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Search</button>

      {pageRecipe && pageRecipe.ingredients ? (
        <div className="recipe-display">
          <h2>{pageRecipe.name}</h2>
          <div>
            <p><strong>Calories:</strong> {pageRecipe.calories || '—'} kcal</p>
            <p><strong>Protein:</strong> {pageRecipe.protein || '—'} g</p>
            <p><strong>Carbs:</strong> {pageRecipe.carbs || '—'} g</p>
            <p><strong>Fats:</strong> {pageRecipe.fats || '—'} g</p>
          </div>

          <h3>Ingredients:</h3>
          <ul>
            {pageRecipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3>Instructions:</h3>
          <ol>
            {pageRecipe.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      ) : (
        <p style={{ marginTop: '30px', textAlign: 'center', color: 'gray' }}>
          Enter your preferences and hit <strong>Search</strong> to generate a recipe.
        </p>
      )}
    </div>
  );
}

export default HomePage;

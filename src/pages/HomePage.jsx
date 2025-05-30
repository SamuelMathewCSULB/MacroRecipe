import React, { useState } from 'react';

function HomePage({ pageRecipe, setpageRecipe }) {
  console.log('✅ HomePage is rendering');
  const [ingredients, setIngredients] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [foodType, setFoodType] = useState('');

  const handleSubmit = async () => {
      console.log('🟡 handleSubmit triggered');
  console.log('🟡 handleSubmit called'); // ADD THIS

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

    console.log('🟢 Response received:', response);

    const text = await response.text();
console.log('📃 Raw text:', text);
const data = JSON.parse(text); // ✅ Add this line back in
console.log('📦 Parsed data:', data);

setpageRecipe(data);

    setIngredients('');
    setCalories('');
    setProtein('');
    setFoodType('');
  } catch (error) {
    console.error('❌ Error fetching recipe:', error);
  }
};


  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>AI-Powered Recipe Generator</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>Ingredients (comma separated):</label><br />
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Calorie Budget:</label><br />
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Protein Goal (grams):</label><br />
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Type of Cuisine (e.g., Italian, Vegan):</label><br />
        <input
          type="text"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <button onClick={handleSubmit} style={{ width: '100%', padding: '10px', fontWeight: 'bold' }}>
        Search
      </button>

      {pageRecipe && pageRecipe.ingredients ? (
  <div style={{ marginTop: '30px' }}>
    <h2>{pageRecipe.name}</h2>

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

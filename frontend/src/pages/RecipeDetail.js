import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../styles/RecipeDetail.css'; // ✅ Import CSS

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      setRecipe(res.data.recipe);
    } catch (err) {
      setError('Failed to load recipe.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div className="recipe-detail-container">
      <h2>{recipe.title}</h2>

      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} />
      )}

      <div className="recipe-meta">
        <p><strong>Created By:</strong> {recipe.createdBy.username}</p>
        <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
        <p><strong>Created At:</strong> {new Date(recipe.createdAt).toLocaleString()}</p>
      </div>

      <div className="recipe-section">
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>
      </div>

      <Link to="/" className="back-link">← Back to Recipes</Link>
    </div>
  );
}

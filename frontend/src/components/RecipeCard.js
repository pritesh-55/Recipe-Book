// src/components/RecipeCard.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card" style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} width="200" />
      )}
      <h3>{recipe.title}</h3>
      <p><strong>By:</strong> {recipe.createdBy.username}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
      <Link to={`/recipes/${recipe._id}`}>View Details</Link>
    </div>
  );
}

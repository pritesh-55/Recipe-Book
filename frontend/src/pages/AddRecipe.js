import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/AddRecipe.css';

export default function AddRecipe() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    imageUrl: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      ...formData,
      cookingTime: Number(formData.cookingTime),
      ingredients: formData.ingredients
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean),
    };

    try {
      await axios.post('https://recipe-book-backend-efrw.onrender.com/api/recipes', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/my-recipes');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add New Recipe</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />

        <textarea
          name="instructions"
          placeholder="Cooking Instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="cookingTime"
          placeholder="Cooking Time (in minutes)"
          value={formData.cookingTime}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
}

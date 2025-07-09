import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/AddRecipe.css';

export default function EditRecipe() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://recipe-book-backend-efrw.onrender.com/api/recipes/${id}`);
        const recipe = res.data.recipe;
        setFormData({
          title: recipe.title || '',
          ingredients: (recipe.ingredients || []).join(', '),
          instructions: recipe.instructions || '',
          cookingTime: recipe.cookingTime || '',
          imageUrl: recipe.imageUrl || '',
        });
      } catch (err) {
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...formData,
      cookingTime: Number(formData.cookingTime),
      ingredients: formData.ingredients
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean),
    };

    try {
      await axios.put(`https://recipe-book-backend-efrw.onrender.com/api/recipes/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/my-recipes');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update recipe');
    }
  };

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="add-recipe-container">
      <h2>Edit Recipe</h2>

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
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

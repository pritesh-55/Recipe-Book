import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/MyRecipes.css';

export default function MyRecipes() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMyRecipes = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://recipe-book-backend-efrw.onrender.com/api/recipes/user/my-recipes?page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.recipes;
      setRecipes(data.docs);
      setPage(data.page);
      setPagination({
        totalPages: data.totalPages,
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
      });
    } catch (err) {
      setError('Failed to load your recipes.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      await axios.delete(`https://recipe-book-backend-efrw.onrender.com/api/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMyRecipes(page); // reload current page
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete recipe.');
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  return (
    <div className="my-recipes-container">
      <h2>My Recipes</h2>

      {loading ? (
        <p>Loading your recipes...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : recipes.length === 0 ? (
        <p>You have not added any recipes yet.</p>
      ) : (
        <>
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe._id}>
              <h3>{recipe.title}</h3>
              {recipe.imageUrl && (
                <img src={recipe.imageUrl} alt={recipe.title} />
              )}
              <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
              <p><strong>Created:</strong> {new Date(recipe.createdAt).toLocaleString()}</p>

              <div className="recipe-actions">
                <button onClick={() => navigate(`/edit-recipe/${recipe._id}`)}>Edit</button>
                <button onClick={() => handleDelete(recipe._id)}>Delete</button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => fetchMyRecipes(page - 1)}
              disabled={!pagination.hasPrevPage}
            >
              Previous
            </button>
            <span>Page {page} of {pagination.totalPages}</span>
            <button
              onClick={() => fetchMyRecipes(page + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

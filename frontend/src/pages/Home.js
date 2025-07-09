// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // ✅ Import the new CSS

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchRecipes = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', pageNumber);
      if (search) params.append('title', search);
      if (ingredients) params.append('ingredients', ingredients);
      if (cookingTime) params.append('cookingTime', cookingTime);

      const res = await axios.get(`https://recipe-book-backend-efrw.onrender.com/api/recipes?${params.toString()}`);
      const data = res.data.recipes;

      setRecipes(data.docs);
      setPage(data.page);
      setPagination({
        totalPages: data.totalPages,
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
      });
    } catch (err) {
      console.error('Failed to load recipes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(1);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipes(1);
  };

  const goToPage = (pageNum) => {
    fetchRecipes(pageNum);
  };

  return (
    <div className="container">
      <h2>All Recipes</h2>

      {/* Search & Filter */}
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Cooking Time (in minutes)"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Recipe Cards */}
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <>
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <h3>{recipe.title}</h3>
              {recipe.imageUrl && (
                <img src={recipe.imageUrl} alt={recipe.title} />
              )}
              <p><strong>By:</strong> {recipe.createdBy?.username}</p>
              <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
              <Link to={`/recipes/${recipe._id}`}>View Details</Link>
            </div>
          ))}

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={!pagination.hasPrevPage}
            >
              Previous
            </button>
            <span>
              Page {page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => goToPage(page + 1)}
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

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetail from './pages/RecipeDetail';
import MyRecipes from './pages/MyRecipes';
import { AuthContext } from './context/AuthContext';

function App() {
  const { token } = useContext(AuthContext);
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-recipe" element={token ? <AddRecipe /> : <Navigate to="/login" />} />
          <Route path="/edit-recipe/:id" element={token ? <EditRecipe /> : <Navigate to="/login" />} />
          <Route path="/my-recipes" element={token ? <MyRecipes /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;

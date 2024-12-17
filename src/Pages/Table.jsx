import './Table.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Table = ({ recipes, setRecipe, fetchRecipes }) => {
  const { reset } = useForm();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = recipes.filter(recipe => {

    const nameMatch = recipe.name && recipe.name.toLowerCase().includes(searchQuery.toLowerCase());

    const ingredientsMatch = recipe.ingredients && 
      (typeof recipe.ingredients === 'string' 
        ? recipe.ingredients.toLowerCase().includes(searchQuery.toLowerCase()) 
        : recipe.ingredients.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) 
      );

    return nameMatch || ingredientsMatch;
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://recipe-backend-taupe.vercel.app/api/deleteRecipe/${id}`);
      fetchRecipes();
      toast.success('Recipe deleted successfully!');
      reset();
    } catch (error) {
      console.error('Error', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div id='table' className="recipe-container">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by name or ingredients..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="search-input" 
        />
      </div>

      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3 className="recipe-title">Name: <i>{recipe.name}</i></h3>
            <p className="recipe-description">Ingredients: <i>{recipe.ingredients}</i></p>
            <p className="recipe-description">Description: <i>{recipe.description}</i></p>
            <p className="recipe-description">Instructions: <i>{recipe.instructions}</i></p>
            <div className="recipe-actions">
              <button onClick={() => setRecipe(recipe)} className="edit-btn"><i className="fa-solid fa-pen-to-square"></i></button>
              <button onClick={() => handleDelete(recipe._id)} className="delete-btn"><i className="fa-sharp fa-solid fa-trash"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;

import './Table.css';
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Table = ({ recipes, setRecipe, fetchRecipes }) => {
  const { reset} = useForm()
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://recipe-backend-taupe.vercel.app/api/deleteRecipe/${id}`);
      fetchRecipes(); 
     toast.success('Recipe  deleted successfully!');
      reset()
    } catch (error) {
      console.error('Error', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="recipe-card">
          <h3 className="recipe-title">Name: <i>{recipe.name}</i></h3>
          <p className="recipe-description">Ingredients: <i>{recipe.ingredients}</i></p>
          <p className="recipe-description">Description: <i>{recipe.description}</i></p>
          <p className="recipe-description">Instructions: <i>{recipe.instructions}</i></p>
          <div className="recipe-actions">
            <button onClick={() => setRecipe(recipe)} className="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button onClick={() => handleDelete(recipe._id)} className="delete-btn"> <i class="fa-sharp fa-solid fa-trash"></i></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;

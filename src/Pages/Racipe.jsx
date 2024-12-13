import './Recipe.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Recipe = ({ recipe, setRecipe, fetchRecipes }) => {

  const { reset } = useForm();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients.join(', '),
        instructions: recipe.instructions,
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, ingredients, instructions } = formData;
    const ingredientsArray = ingredients.split(',').map((item) => item.trim());

    try {
      if (recipe) {
        await axios.put(`https://recipe-backend-taupe.vercel.app/api/updateRecipe/${recipe._id}`, {
          name,
          description,
          ingredients: ingredientsArray,
          instructions,
        });
        toast.success('Recipe updated successfully!');
        reset();
      } else {
        await axios.post('https://recipe-backend-taupe.vercel.app/api/addRecipe', {
          name,
          description,
          ingredients: ingredientsArray,
          instructions,
        });
        toast.success('Recipe added successfully!');
        reset();
      }

      fetchRecipes();
      setRecipe(null);
      reset();

    } catch (error) {
      console.error('Error', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="title">
      <h2>Add Recipe</h2>
    </div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="ingredients"
        value={formData.ingredients}
        onChange={handleChange}
        placeholder="Ingredients"
        required
      />
      <textarea name="instructions" 
        value={formData.instructions}
        onChange={handleChange}
        placeholder="Instructions"
        required
      />
      <button type="submit">{recipe ? 'Update Recipe' : 'Add Recipe'}</button>
    </form>
    </>
  );
};

export default Recipe;

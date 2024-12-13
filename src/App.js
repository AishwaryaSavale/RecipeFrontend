import './App.css';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import Search from './Pages/Search';
import Recipe from './Pages/Racipe';
import Table from './Pages/Table';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const App=()=> {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const { reset} = useForm()

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('https://recipe-backend-taupe.vercel.app/api/getRecipes');
      setRecipes(response.data.message);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  },[]);

  return (


<>   <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 1000,
        style: {
          background: '#363636',
          color: '#fff',
        },

        // Default options for specific types
        success: {
          duration: 1000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }}
    />
    <div>
      <h1>Recipe Manager</h1>
      <Recipe recipe={recipe} setRecipe={setRecipe} fetchRecipes={fetchRecipes} />
      <Search setRecipes={setRecipes} />
      <Table recipes={recipes} setRecipe={setRecipe} fetchRecipes={fetchRecipes} />
    </div>  </>

    
  );
};

export default App;

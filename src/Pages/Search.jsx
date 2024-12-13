import './Search.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Search = ({ setRecipes }) => {
  const [query, setQuery] = useState('');
  const { reset} = useForm()

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://recipe-backend-taupe.vercel.app/api/search?query=${query}`);
      setRecipes(response.data.message);
      toast.success('Search Successful !!');
      reset()
    } catch (error) {
      console.error('Error', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (

    <div>
      <input id='input'
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
      <button  id='button' onClick={handleSearch}><i className="fas fa-search"></i></button>
    </div>
  );
};

export default Search;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Recipe.css';

export default function RecipeList() {
    const [recipe, setRecipe] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRecipe();
    }, []);

    const getRecipe = async () => {
        console.log('hi');
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;

            const response = await axios.get(
                'https://recipe-app-backend-t1iy.onrender.com',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setRecipe(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRecipe = (id) => {
        console.log(id);
        navigate(`/getrecipe/${id}`);
    };

    return (
        <div>
            <h1>Recipe List</h1>
            <div className='recipe-container'>
                {recipe.map((recipe) => {
                    return (
                        <div key={recipe._id} className='recipe-card' onClick={() => handleRecipe(recipe._id)}>
                            <img src={recipe.image} alt='Recipe' />
                            <div className='recipe-details'>
                                <h2>{recipe.title}</h2>
                                <h3>{recipe.description}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

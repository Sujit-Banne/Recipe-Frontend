import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './UpdateComponent.module.css'; // Import CSS module

export default function UpdateComponent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRecipeDetails();
    }, []);

    const getRecipeDetails = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const response = await axios.get(
                `https://recipe-app-backend-t1iy.onrender.com/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTitle(response.data.title);
            setDescription(response.data.description);
            setIngredients(response.data.ingredients);
            setInstructions(response.data.instructions);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const updateRecipe = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const response = await axios.put(
                `https://recipe-app-backend-t1iy.onrender.com/${params.id}`,
                {
                    title,
                    description,
                    ingredients,
                    instructions,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles['update-component']}>
            <h1>Update Recipe</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </div>

            <div>
                <textarea
                    placeholder="Enter product Descriptions"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
            </div>

            <div>
                <textarea
                    placeholder="Enter Ingredients"
                    value={ingredients}
                    onChange={(e) => {
                        setIngredients(e.target.value);
                    }}
                />
            </div>

            <div>
                <textarea
                    placeholder="Enter Instructions"
                    value={instructions}
                    onChange={(e) => {
                        setInstructions(e.target.value);
                    }}
                />
            </div>

            <button onClick={updateRecipe}>Update Recipe</button>
        </div>
    );
}

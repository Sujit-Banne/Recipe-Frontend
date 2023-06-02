import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './GetDetails.css'

export default function GetRecipeDetail() {
    const [recipe, setRecipe] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getRecipe()
    }, [id])

    const getRecipe = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token

            const response = await axios.get(`https://recipe-app-backend-t1iy.onrender.com/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setRecipe(response.data)
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    //delete recipe
    const deleteRecipe = async (id) => {
        console.log(id);
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token
            const response = await axios.delete(`https://recipe-app-backend-t1iy.onrender.com/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                await getRecipe()
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className='recipe'>
                <div className='recipe-image'>
                    <img src={recipe.image} alt='Recipe' />
                </div>
                <div className='recipe-details'>
                    <h1 className='recipe-title'>{recipe.title}</h1>
                    <div className='recipe-content'>
                        <p className='recipe-description'><strong>Description:</strong> {recipe.description}</p>
                        <p className='recipe-ingredients'><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p className='recipe-instructions'><strong>Instructions:</strong> {recipe.instructions}</p>
                    </div>
                </div>
            </div>
            <div className='button'>
                <button onClick={() => deleteRecipe(recipe._id)} className='delete'>Delete</button>
                <Link to={'/update/' + recipe._id} className='update'>Edit Recipe</Link>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import axios from 'axios'
import './Addrecipe.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Addrecipe() {

    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(false);

    //image upload
    const [image, setImage] = useState('')
    const [uploadedImages, setUploadedImages] = useState([])

    const addRecipe = async () => {
        if (!title || !ingredients || !instructions || !description || uploadedImages.length === 0) {
            setError(true);
            return false;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const userId = user.id;

        try {
            const result = await axios.post('https://recipe-app-backend-t1iy.onrender.com/add-recipe', {
                title,
                ingredients,
                instructions,
                description,
                userId,
                image: uploadedImages[0] // pass the first uploaded image URL as the product photo
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log(result.data);

            // Reset form fields
            setTitle('');
            setIngredients('');
            setInstructions('');
            setDescription('');
            setError(false);
            setImage("")
            setUploadedImages([]); // clear uploaded images after successfully adding the product
        } catch (error) {
            console.error(error);
        }
    };

    //cloudinary
    const submitImage = () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'sujit-cloudinary');
        data.append('cloud_name', 'dnfdw5o96');

        axios.post('https://api.cloudinary.com/v1_1/dnfdw5o96/image/upload', data)
            .then((response) => {
                console.log(response.data);
                const imageUrl = response.data.secure_url;
                setUploadedImages([...uploadedImages, imageUrl]);
                // Show toast notification
                toast.success('Image uploaded successfully!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="add-recipe-container">
            <h1>Add Recipe</h1>

            {/* Upload */}
            <div className="upload-container">
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button onClick={submitImage}>Upload</button>
            </div>

            <div className="input-container">
                <input type="text" placeholder="Enter Title"
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                {error && !title && <span className="error">Enter valid Title</span>}
            </div>

            <div className="input-container">
                <textarea placeholder="Enter Description"
                    value={description} onChange={(e) => setDescription(e.target.value)} />
                {error && !description && <span className="error">Enter valid Description</span>}
            </div>

            <div className="input-container">
                <textarea placeholder="Enter Ingredients"
                    value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                {error && !ingredients && <span className="error">Enter valid Ingredients</span>}
            </div>

            <div className="input-container">
                <textarea placeholder="Enter Instructions"
                    value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                {error && !instructions && <span className="error">Enter valid Instructions</span>}
            </div>

            <button onClick={addRecipe}>Add Recipe</button>

            {/* Toast container */}
            <ToastContainer />
        </div>
    )
}

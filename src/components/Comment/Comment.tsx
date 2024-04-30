import { useEffect, useState } from 'react';
import { handleRecipe, handleComment } from './helpers.ts';

interface Recipe {
    id_recipe: string;
    name_recipe: string;
    steps: string;
    category: string;
    difficulty: string;
    image: string;
    owner: {
        username: string;
        profilepicture: string;
    };
    comments: Comment[];
}

interface Comment {
    id_comment: number;
    content: string;
    date: string;
    user: {
        username: string;
    };
}

export default function RecipeCard() {
    const [recipe, setRecipe] = useState<Recipe|null>(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchRecipeAndComments = async () => {
            const recipeData = await handleRecipe();
            const id = recipeData[0].id_recipe;
            const commentsData = await handleComment(id);
            setRecipe(recipeData[0]);
            setComments(commentsData);
        };
        fetchRecipeAndComments();
    }, [recipe]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{recipe.name_recipe}</h2>
            <h3>Author: {recipe.owner.username}</h3>
            <h4>Comments:</h4>
            {comments.map((comment, index) => (
                <p key={index}>{comment}</p>
            ))}
        </div>
    );
}
import { useEffect, useState } from 'react';
import { handleRecipe, handleComment } from './helpers.ts';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Recipe {
    id_recipe: string;
    name_recipe: string;
    owner: {
        username: string;
    };
}

interface Comment {
    id_comment: string;
    comment: string;
}

export default function RecipeCard() {
    const [recipe, setRecipe] = useState<Recipe|null>(null);
    const [recipes, setRecipes] = useState<Recipe[]|null>(null);
    const [comments, setComments] = useState<Comment[]|null>(null);
    const [indice, setIndice] = useState(0);

    const changeRecipe = () => {
        setIndice((indice +1))
    };

    useEffect(() => {
        const fetchRecipeAndComments = async () => {
            const recipeData = await handleRecipe();
            if (recipeData.length === 0) {
                return;
            }
            const id = recipeData[indice].id_recipe;
            const commentsData = await handleComment(id);
            setRecipes(recipeData);
            setComments(commentsData);
            setRecipe(recipeData[indice])
        };
        fetchRecipeAndComments();
    }, [indice]);

    if (!recipes) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', width: '200vh' }}>
                <LoadingButton style={{ backgroundColor: 'white', color:'black', height: '100px', width: '100px' }} loading variant="outlined">
                </LoadingButton>
            </div>
        )
    }

    return (
        <Card sx={{ maxWidth: '50%', margin: 'auto' }}>
            <CardHeader
                title={recipe?.name_recipe}
                subheader= {`Propriétaire : ${recipe?.owner.username}`}
                action={
                    <IconButton aria-label="settings" onClick={() => {changeRecipe();}}>
                        <ArrowForwardIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <Typography fontWeight={"bold"} paragraph>Comments :</Typography>
                {comments?.map((comment, index) => (
                    <Typography key={index} style={{ fontStyle: "italic" }} paragraph>
                        {comment?.comment}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
}
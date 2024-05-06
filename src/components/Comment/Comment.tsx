import { useEffect, useState } from 'react';
import { handleRecipe, handleComment, deleteRecipe } from './helpers.ts';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';
import Stack from "@mui/material/Stack";
import React from 'react';

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
    const [validator, setValidator] = useState(false);

    const changeRecipe = () => {
        if (indice === recipes!.length - 1) {
            setIndice(0);
        } else {
            setIndice((indice + 1));
        }
    };

    const clearRecipe = async (id_recipe: string, id_comment:string) => {
        try {
            await deleteRecipe(id_recipe, id_comment);
            setValidator(!validator);
        } catch (error) {
            console.error('Delete Recipe failed:', error);
            throw new Error('Failed to delete recipe');
        }
    };

    useEffect(() => {
        const fetchRecipeAndComments = async () => {
            const recipeData = await handleRecipe();
            if (recipeData.length === 0) {
                return;
            }
            if (indice >= recipeData.length) {
                return;
            }
            const id = recipeData[indice].id_recipe;
            const commentsData = await handleComment(id);
            setRecipes(recipeData);
            setComments(commentsData);
            setRecipe(recipeData[indice])
        };
        fetchRecipeAndComments();
    }, [indice, validator]);

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
                    {comments?.map((comment) => (
                        <React.Fragment key={comment.id_comment}>
                            <Stack direction="row" spacing={2}>
                                <Typography style={{ fontStyle: "italic" }} paragraph>
                                    {comment?.comment}
                                </Typography>
                                <IconButton aria-label="clear" onClick={() => {clearRecipe(recipe!.id_recipe,comment.id_comment);}}>
                                    <ClearIcon />
                                </IconButton>
                            </Stack>
                        </React.Fragment>
                    ))}
            </CardContent>
        </Card>
    );
}
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import {deleteRecipe, handleRecipe, patchRecipe} from './helpers.ts';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface Recipe {
    length: number;
    owner: {
        profilepicture: string;
        username: string;
    };
    name_recipe: string;
    image: string;
    steps: string;
    id_recipe: string;
    difficulty: string;
    category: string;
    duration: string;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function RecipeReviewCard() {
    const [recipe, setRecipe] = React.useState<Recipe[] | null>(null);    const [expanded, setExpanded] = React.useState(false);
    const [reload, setReload] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [index, setIndex] = React.useState(0)

    const handleUserClick = () => {
        setIndex(index + 1)
        if (recipe != null && index >= recipe.length-1) {
            setReload(!reload);
        }
    }

    React.useEffect(() => {
        const fetchRecipe = async () => {
            const result = await handleRecipe();
            setRecipe(result);
        };

        fetchRecipe();
    }, [reload]);

    if (recipe === undefined || !recipe || recipe.length === 0) {
        return (
            <Card sx={{ maxWidth: '21%', marginTop: '20%', marginLeft:'40%'}}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                       Bravo ! Toutes les recettes ont été validées ^^
                    </Typography>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <Card sx={{ maxWidth: '50%', margin: 'auto' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            <img src={recipe[index]?.owner?.profilepicture} alt={recipe[index]?.owner?.username} width="40" height="40" border-radius={'50%'}/>
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={recipe[index]?.name_recipe}
                    subheader={recipe[index]?.owner?.username}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={recipe[index]?.image}
                    alt={recipe[index]?.name_recipe}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {recipe[index]?.steps}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="refuse" onClick={() => { deleteRecipe(recipe[index]?.id_recipe); handleUserClick();}}>
                        <DoDisturbIcon fontSize="large" />
                    </IconButton>
                    <IconButton aria-label="validate" onClick={() => {patchRecipe(recipe[index]?.id_recipe); handleUserClick();}}>
                        <DoneIcon fontSize="large" />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography fontWeight={"bold"} paragraph>Résumé</Typography>
                        <Typography style={{ fontStyle: "italic" }} paragraph>
                            Difficulté : {recipe[index]?.difficulty}
                        </Typography>
                        <Typography fontStyle={"italic"} paragraph>Catégorie : {recipe[index]?.category}</Typography>
                        <Typography fontStyle={"italic"} paragraph>Durée : {recipe[index]?.duration}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

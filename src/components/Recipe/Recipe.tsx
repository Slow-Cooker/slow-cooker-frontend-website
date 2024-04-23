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
import {handleRecipe} from './helpers.ts';
import {user} from './helpers.ts';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
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

const recipe =  await handleRecipe();

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [index, setIndex] = React.useState(0)

    const handleUserClick = () => {
        setIndex(index + 1)
    }

    return (
        <Card sx={{ maxWidth: '50%', margin: 'auto' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {user[index].name[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={recipe[index].name_recipe}
                subheader={user[index].subheader}
            />
            <CardMedia
                component="img"
                height="194"
                image={recipe[index].image}
                alt={user[index].title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {user[index].typography}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="refuse" onClick={handleUserClick}>
                    <DoDisturbIcon fontSize="large" />
                </IconButton>
                <IconButton aria-label="validate" onClick={handleUserClick}>
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
                        Difficulté : {recipe[index].difficulty}
                    </Typography>
                    <Typography fontStyle={"italic"} paragraph>Catégorie : {recipe[index].category}</Typography>
                    <Typography fontStyle={"italic"} paragraph>Durée : {recipe[index].duration}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

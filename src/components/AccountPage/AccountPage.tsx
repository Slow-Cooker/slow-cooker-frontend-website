import React, { useState, useEffect } from 'react';
import { getData, RecipeData, UserData } from '../../api/call.ts';
import { Typography, CircularProgress, Paper, Avatar, Grid } from '@mui/material';

const AccountPage: React.FC = () => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users/me`;
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        console.log(apiUrl);
        const fetchData = async () => {
            try {
                const responseData = await getData(apiUrl);
                setUserData(responseData as UserData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

    const renderUserData = () => {
        if (loading) return <CircularProgress />;
        if (error) return <Typography variant="body1">{error}</Typography>;
        if (!userData) return null;

        return (
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    User Informations
                </Typography>
                <Avatar alt="Profile Picture" src={userData.profilepicture} style={{ marginBottom: '10px' }} />
                <Typography variant="body1">
                    <strong>Name:</strong> {userData.username}
                </Typography>
                <Typography variant="body1">
                    <strong>Email:</strong> {userData.email}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '20px' }}>
                    <strong>My Recipes:</strong>
                </Typography>
                <Grid container spacing={2}>
                    {renderRecipe()}
                </Grid>
                <Typography variant="body1" style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <strong>My Selections:</strong>
                </Typography>
                <Grid container spacing={2}>
                    {renderSelection()}
                </Grid>
            </Paper>
        );
    };



    const renderRecipe = () => {
        if (!userData || !userData.recipe || userData.recipe.length === 0) {
            return (
                <Paper elevation={2} style={{ padding: '10px' }}>
                    <Typography variant="body1">No recipes found</Typography>
                </Paper>
            );
        }

        return userData.recipe.map((recipe: RecipeData, index) => (
            <Grid item xs={12} key={index}>
                <Paper elevation={2} style={{ padding: '10px' }}>
                    <Typography variant="body1">
                        <strong>Title:</strong> {recipe.name_recipe}
                    </Typography>
                </Paper>
            </Grid>
        ));
    };

    const renderSelection = () => {
        if (!userData ||!userData.selection || userData.selection.length === 0) {
            return (
                <Paper elevation={2} style={{ padding: '10px' }}>
                    <Typography variant="body1">No selections found</Typography>
                </Paper>
            );
        }

        return userData.selection.map((selection, index) => (
            <Grid item xs={12} key={index}>
                <Paper elevation={2} style={{ padding: '10px' }}>
                    <Typography variant="body1">
                        <strong>Name:</strong> {selection.name}
                    </Typography>
                </Paper>
            </Grid>
        ));
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                User Account Information
            </Typography>
            {renderUserData()}
        </div>
    );
};

export default AccountPage;

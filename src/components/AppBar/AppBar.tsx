import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircle} from "@mui/icons-material";
import {Link, useNavigate} from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

const StyledAppBar = styled(AppBar)({
    backgroundColor: "#E88E54FF",
    width: "100%",
});


const StyledToolbar = styled(Toolbar)({
    backgroundColor: "#E88E54FF",
    width: "1540px",
});

export function withAuth(Component: React.ComponentType<any>) {
    return function AuthenticatedComponent(props: any) {
        const token = localStorage.getItem('token');
        const navigate = useNavigate();
        if (!token) {
            navigate('/');
            return null;
        }

        return <Component {...props} />;
    };
}

export function PrimarySearchAppBar() {
    const AuthenticatedAccountCircle = withAuth(AccountCircle);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRecipe =  () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return null;
        }
        navigate('/verify');
    };

    const handleComment =  () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return null;
        }
        navigate('/comment');
    };

    const handleLogOut =  () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="open drawer"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => { handleClose(); handleRecipe(); }}>Recettes</MenuItem>
                    <MenuItem onClick={() => { handleClose(); handleComment(); }}>Commentaires</MenuItem>
                    <MenuItem onClick={() => { handleClose(); handleLogOut(); }}>Déconnexion</MenuItem>
                </Menu>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1, padding: 3}}>
                    SLOW COOKER
                </Typography>
                <Link to="/account" style={{ textDecoration: 'none' }}>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        color="inherit"
                    >
                        <AuthenticatedAccountCircle />
                    </IconButton>
                </Link>
                <IconButton size="large" aria-label="show more" color="inherit">
                </IconButton>
            </StyledToolbar>
        </StyledAppBar>
    );
}

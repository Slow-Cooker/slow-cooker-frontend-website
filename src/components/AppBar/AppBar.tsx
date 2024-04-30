import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import {AccountCircle} from "@mui/icons-material";
import {Link, useNavigate} from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

const StyledAppBar = styled(AppBar)({
    backgroundColor: "#E88E54FF",
    width: "100%",
});


const StyledToolbar = styled(Toolbar)({
    color: "black",
    width: "1530px",
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

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

export default function PrimarySearchAppBar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    SLOW COOKER
                </Typography>
                {!isMobile && (
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                )}
                <Box sx={{ flexGrow: 1 }} />
                <IconButton size="large" aria-label="show notifications" color="inherit">
                    <NotificationsIcon />
                </IconButton>
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

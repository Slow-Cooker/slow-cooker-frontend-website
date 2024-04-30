import './App.css';
import LoginFinal from './components/Auth/Login.tsx';
import { CssVarsProvider } from '@mui/joy/styles';
import ModeToggle from './components/DarkMode/DarkMode';
import RecipeReviewCard from "./components/Recipe/Recipe.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountPage from "./components/AccountPage/AccountPage.tsx";
import Comment from "./components/Comment/Comment.tsx";
import {PrimarySearchAppBar} from "./components/AppBar/AppBar.tsx";

export function App() {
    return (<>
        <CssVarsProvider>
            <ModeToggle />
        </CssVarsProvider>
            <Router>
                <PrimarySearchAppBar />
                <Routes>
                    <Route path="/" element={<LoginContainer />} />
                    <Route path="/verify" element={<RecipeReviewCard />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path={"/comment"} element={<Comment />} />
                </Routes>
            </Router>

    </>);
}


function LoginContainer() {
    return (
        <div className="login-container">
            <LoginFinal />
        </div>
    );
}

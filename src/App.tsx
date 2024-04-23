import './App.css';
import LoginFinal from './components/Auth/Login.tsx';
import { CssVarsProvider } from '@mui/joy/styles';
import ModeToggle from './components/DarkMode/DarkMode';
import RecipeReviewCard from "./components/Recipe/Recipe.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <CssVarsProvider>
                <ModeToggle />
            </CssVarsProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginContainer />} />
                        <Route path="/verify" element={<RecipeReviewCard />} />
                    </Routes>
                </Router>
        </>
    );
}


function LoginContainer() {
    return (
        <div className="login-container">
            <LoginFinal />
        </div>
    );
}

export default App

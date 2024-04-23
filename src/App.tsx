import './App.css';
import LoginFinal from './components/Auth/Login.tsx';
import { CssVarsProvider } from '@mui/joy/styles';
import ModeToggle from './components/DarkMode/DarkMode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components from react-router-dom

// Main App component
function App() {
    return (
        <CssVarsProvider>
            <ModeToggle />
            <Router>
                <Routes>
                    <Route path="/" element={<LoginContainer />} />
                </Routes>
            </Router>
        </CssVarsProvider>
    );
}


function LoginContainer() {
    return (
        <div className="login-container">
            <LoginFinal />
        </div>
    );
}

export default App;

// App.js

import './App.css';
import LoginFinal from './components/Auth/Auth';
import { CssVarsProvider } from '@mui/joy/styles';
import ModeToggle from './components/DarkMode/DarkMode';

// Main App component
function App() {
    return (
        <CssVarsProvider>
            <ModeToggle />
            <div className="login-container">
                <LoginFinal />
            </div>
        </CssVarsProvider>
    );
}

export default App;

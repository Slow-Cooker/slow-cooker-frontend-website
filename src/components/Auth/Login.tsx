import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useState } from "react";
import { postData } from "../../api/call.ts";
import { useNavigate } from 'react-router-dom';

export default function LoginFinal() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to track login error

    const handleLogin = async () => {
        const apiUrl = 'http://localhost:3000/users/auth/login';
        const requestBody = { email, password };
        try {
            const responseData = await postData(apiUrl, requestBody);
            localStorage.setItem('token', responseData.token);
            if (responseData.user.role === 'Admin') {
                navigate('/verify');
            }else {
                setError("You are not an Admin");
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError("Invalid email or password. Please try again."); // Set error message
        }
    };

    return (
        <main>
            <CssBaseline />
            <Sheet
                sx={{
                    width: "100%",
                    mx: 'center',
                    my: 4,
                    py: 3,
                    px: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                    marginLeft: '150%',
                    marginTop: '30%'
                }}
                variant="outlined"
            >
                <div>
                    <Typography level="h4" component="h1">
                        <b>Welcome!</b>
                    </Typography>
                    <Typography level="body-sm">Sign in to continue.</Typography>
                </div>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                {error && (
                    <Typography sx={{ color: 'red', mt: 1 }}>
                        {error}
                    </Typography>
                )}
                <Button sx={{ mt: 1, backgroundColor: "#E88E54FF" }} onClick={handleLogin}>
                    Log in
                </Button>
            </Sheet>
        </main>
    );
}

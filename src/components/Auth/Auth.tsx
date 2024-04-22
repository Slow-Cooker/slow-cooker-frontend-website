import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import {useState} from "react";
import {postData} from "../../api/call.ts";
export default function LoginFinal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const apiUrl = 'http://your-api-url.com/api/login'; // Replace with your API endpoint
        const requestBody = { email, password };
        try {
            const responseData = await postData(apiUrl, requestBody);
            console.log('Login successful:', responseData);
            // Handle successful login (e.g., store authentication token, redirect user)
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error (e.g., display error message to user)
        }
    };

    return (
        <main>
            <CssBaseline />
            <Sheet
                sx={{
                    width: "100%",
                    mx: 'center', // margin left & right
                    my: 4, // margin top & bottom
                    py: 3, // padding top & bottom
                    px: 4, // padding left & right
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
                <Button sx={{ mt: 1, backgroundColor:"#E88E54FF"}} onClick={handleLogin}>
                    Log in
                </Button>
                <Typography
                    endDecorator={<Link href="/sign-up">Sign up</Link>}
                    fontSize="sm"
                    sx={{ alignSelf: 'center'}}
                >
                    Don&apos;t have an account?
                </Typography>
            </Sheet>
        </main>
    );
}

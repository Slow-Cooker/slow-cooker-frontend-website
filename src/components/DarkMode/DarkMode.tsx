import { useColorScheme } from '@mui/joy/styles';
import React from 'react';
import Button from '@mui/joy/Button';

function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    // @ts-ignore
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleModeToggle = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: 16, // Adjust this value to change the distance from the bottom
            right: 16, // Adjust this value to change the distance from the right
            zIndex: 1000, // Ensure the button appears above other content
        }}>
            <Button
                variant="soft"
                onClick={handleModeToggle}
            >
                {mode === 'light' ? 'Turn dark' : 'Turn light'}
            </Button>
        </div>
    );
}

export default ModeToggle;

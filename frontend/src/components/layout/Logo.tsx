import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Logo = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, textDecoration: 'none' }}>
            <Box
                sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    bgcolor: isDark ? '#fafafa' : '#18181b',
                    color: isDark ? '#18181b' : '#fafafa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '16px',
                    letterSpacing: '-0.02em',
                    boxShadow: isDark ? '0 1px 4px rgba(255,255,255,0.1)' : '0 1px 4px rgba(0,0,0,0.12)'
                }}
            >
                S
            </Box>
            <Typography
                variant="h4"
                component="span"
                sx={{
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    fontSize: '1.1rem',
                    color: 'text.primary',
                    display: 'inline-flex',
                    alignItems: 'center'
                }}
            >
                Savannah
                <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400, ml: 0.25 }}>
                    Stack
                </Box>
            </Typography>
        </Box>
    );
};

export default Logo;

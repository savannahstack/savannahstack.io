import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';

const Main = styled('main')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '72px',
    paddingBottom: '40px'
}));

const MainLayout = () => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <CssBaseline />
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(18, 18, 21, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid',
                    borderColor: theme.palette.divider,
                    zIndex: (t) => t.zIndex.drawer + 1
                }}
            >
                <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
                    <Toolbar disableGutters sx={{ minHeight: '64px !important' }}>
                        <Header />
                    </Toolbar>
                </Container>
            </AppBar>
            <Main>
                <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, width: '100%' }}>
                    <Outlet />
                </Container>
            </Main>
        </Box>
    );
};

export default MainLayout;

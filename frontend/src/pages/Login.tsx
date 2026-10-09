import { ElementType, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
    Box,
    Button,
    Container,
    Divider,
    Fade,
    Link as MuiLink,
    Stack,
    Typography
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MainCard from '@/components/cards/MainCard';
import FormLogin from '@/components/form/FormLogin';
import Logo from '@/components/layout/Logo';
import MuiTable from '@/components/table/MuiTable';
import { ModelType } from '@/lib/types';
import API from '@/lib/utils/api';
import { useAppDispatch, fetchRowsByModel } from '@/lib/store';

const Login = () => {
    const dispatch = useAppDispatch();
    const [showDemoAccounts, setShowDemoAccounts] = useState(false);
    const [resetting, setResetting] = useState(false);

    const resetData = async () => {
        try {
            setResetting(true);
            await API.get('auth/create_fake_data');
            dispatch(fetchRowsByModel({ model: ModelType.teacher }));
        } finally {
            setResetting(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 4, md: 6 },
                px: 2
            }}
        >
            <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ mb: 3.5 }}>
                    <Logo />
                </Box>

                <MainCard
                    sx={{
                        width: '100%',
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: '16px',
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: (theme) =>
                            theme.palette.mode === 'dark' ? 'none' : '0 4px 20px -2px rgba(0, 0, 0, 0.04)'
                    }}
                    content={false}
                >
                    <Stack spacing={0.75} sx={{ mb: 3, textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ fontWeight: 600, letterSpacing: '-0.02em', color: 'text.primary' }}>
                            <FormattedMessage id="hi_welcome_back" defaultMessage="Welcome back" />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FormattedMessage id="enter_credentials_continue" defaultMessage="Enter credentials to continue" />
                        </Typography>
                    </Stack>

                    <FormLogin />

                    <Divider sx={{ my: 2.5 }} />

                    <Stack spacing={1.5} alignItems="center">
                        <MuiLink
                            component={Link as ElementType}
                            to={`/form/${ModelType.teacher}/add`}
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 500,
                                textDecoration: 'none',
                                '&:hover': { color: 'text.primary', textDecoration: 'underline' }
                            }}
                        >
                            <FormattedMessage id="no_account" defaultMessage="Don't have an account? Sign up" />
                        </MuiLink>

                        <Button
                            size="small"
                            variant="text"
                            startIcon={<PeopleOutlineIcon sx={{ fontSize: '1rem' }} />}
                            onClick={() => setShowDemoAccounts((prev) => !prev)}
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.8rem',
                                textTransform: 'none',
                                '&:hover': { color: 'text.primary' }
                            }}
                        >
                            {showDemoAccounts ? 'Hide Demo Accounts' : 'Show Demo Teacher Accounts'}
                        </Button>
                    </Stack>
                </MainCard>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Button
                        size="small"
                        variant="text"
                        disabled={resetting}
                        startIcon={<RefreshIcon sx={{ fontSize: '0.9rem' }} />}
                        onClick={resetData}
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            textTransform: 'none',
                            opacity: 0.8,
                            '&:hover': { opacity: 1, bgcolor: 'transparent' }
                        }}
                    >
                        {resetting ? 'Resetting...' : <FormattedMessage id="reset_database_button" defaultMessage="Reset Demo Database" />}
                    </Button>
                </Box>
            </Container>

            {showDemoAccounts && (
                <Fade in={showDemoAccounts}>
                    <Container maxWidth="md" sx={{ mt: 4 }}>
                        <MuiTable model={ModelType.teacher} />
                    </Container>
                </Fade>
            )}
        </Box>
    );
};

export default Login;

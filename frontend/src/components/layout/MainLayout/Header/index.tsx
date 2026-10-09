import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Box, Button } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Logo from '../../Logo';
import ProfileSection from './ProfileSection';
import config from '@/lib/utils/config';

const Header = () => {
    const location = useLocation();
    const isStudentsActive = location.pathname.includes('/student') || location.pathname.includes('/view');

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box component={Link} to={config.defaultPath} sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <Logo />
                </Box>
                <Button
                    component={Link}
                    to={config.defaultPath}
                    startIcon={<PeopleAltOutlinedIcon sx={{ fontSize: '1.1rem' }} />}
                    variant={isStudentsActive ? 'outlined' : 'text'}
                    size="small"
                    sx={{
                        borderRadius: '8px',
                        px: 1.5,
                        py: 0.6,
                        color: isStudentsActive ? 'text.primary' : 'text.secondary',
                        borderColor: isStudentsActive ? 'divider' : 'transparent',
                        bgcolor: isStudentsActive ? 'action.hover' : 'transparent',
                        fontWeight: isStudentsActive ? 600 : 500,
                        '&:hover': {
                            bgcolor: 'action.hover',
                            color: 'text.primary'
                        }
                    }}
                >
                    <FormattedMessage id="student" />
                </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ProfileSection />
            </Box>
        </Box>
    );
};

export default Header;

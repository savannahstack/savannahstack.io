import type { PaletteMode } from '@mui/material';

export const is_development: boolean = process.env.NODE_ENV === 'development';

const config: {
    apiUrl: string;
    basename: string;
    defaultPath: string;
    fontFamily: string;
    theme: PaletteMode;
    presetColor: string;
    i18n: string;
    rtlLayout: boolean;
} = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5001',
    basename: '',
    defaultPath: '/student',
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    theme: 'light',
    presetColor: 'default',
    i18n: 'en',
    rtlLayout: false
};

export default config;

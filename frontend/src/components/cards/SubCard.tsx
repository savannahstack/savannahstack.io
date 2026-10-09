import { ReactNode, forwardRef } from 'react';
import { useTheme, SxProps, Theme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

export interface SubCardProps {
    children: ReactNode | string | null;
    content?: boolean;
    className?: string;
    contentClass?: string;
    darkTitle?: boolean;
    secondary?: ReactNode;
    sx?: SxProps<Theme>;
    contentSX?: SxProps<Theme>;
    title?: string | ReactNode;
}

const SubCard = forwardRef<HTMLDivElement, SubCardProps>(function SubCard(
    { children, className, content = true, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others },
    ref
) {
    const theme = useTheme();

    return (
        <Card
            ref={ref}
            className={className}
            sx={{
                borderRadius: '12px',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : theme.palette.divider,
                boxShadow: 'none',
                ':hover': {
                    boxShadow: theme.palette.mode === 'dark' ? '0 2px 8px 0 rgba(0, 0, 0, 0.3)' : '0 2px 8px 0 rgba(0, 0, 0, 0.04)'
                },
                ...sx
            }}
            {...others}
        >
            {!darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h5">{title}</Typography>} action={secondary} />}
            {darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title}</Typography>} action={secondary} />}

            {title && (
                <Divider
                    sx={{
                        opacity: 1,
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : theme.palette.divider
                    }}
                />
            )}

            {content ? (
                <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
                    {children}
                </CardContent>
            ) : (
                children
            )}
        </Card>
    );
});

export default SubCard;

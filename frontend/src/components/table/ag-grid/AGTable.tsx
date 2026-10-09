import { useMemo, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ColDef } from 'ag-grid-community';
import { Add as AddIcon, Download as DownloadIcon } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import MainCard from '../../cards/MainCard';
import AGTableRenderer from './AGTableRenderer';

import { ModelType, AGTableModelType, get_columns_ag_by_model } from '@/lib/types';
import { useAppDispatch, fetchRowsByModel, useAppSelector } from '@/lib/store';

export default function AGTable() {
    const dispatch = useAppDispatch();
    const params = useParams() as { model?: string };
    const model = params.model as ModelType | undefined;

    const [exportCsv, setExportCsv] = useState<(fileName: string) => void>(() => () => {});

    const rows: AGTableModelType[] = useAppSelector((state) => (model ? ((state.general.models[model] as AGTableModelType[]) ?? []) : []));

    const cols: ColDef<AGTableModelType>[] = useMemo(() => (model ? get_columns_ag_by_model(model) : []), [model]);

    const modelIsValid = model != null && [ModelType.student].includes(model);

    useEffect(() => {
        if (!modelIsValid || model == null) return;
        dispatch(fetchRowsByModel({ model, data: { relation_model: true, relations: ['assignments'] } }));
    }, [dispatch, model, modelIsValid]);

    if (!modelIsValid || model == null) {
        return <Navigate to="/error" replace />;
    }

    const fileName = `${model}-${new Date().toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: '2-digit' })}.csv`;

    return (
        <MainCard
            content={false}
            title={
                <Typography variant="h3" sx={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                    <FormattedMessage id={`${model}_table`} defaultMessage="Students" />
                </Typography>
            }
            secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DownloadIcon sx={{ fontSize: '1rem' }} />}
                        onClick={() => exportCsv(fileName)}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            color: 'text.secondary',
                            borderColor: 'divider',
                            fontWeight: 500,
                            '&:hover': { borderColor: 'text.secondary', color: 'text.primary' }
                        }}
                    >
                        Export
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon sx={{ fontSize: '1rem' }} />}
                        component={Link}
                        to={`/form/${model}/add`}
                        data-testid={`add-${model}-button`}
                        sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
                    >
                        <FormattedMessage id="add" defaultMessage="Add Student" />
                    </Button>
                </Box>
            }
        >
            <Paper sx={{ width: '100%', mb: 2 }} data-testid={`table-wrapper-${model}`}>
                <AGTableRenderer cols={cols} rows={rows} onExportReady={(fn) => setExportCsv(() => fn)} />
            </Paper>
        </MainCard>
    );
}

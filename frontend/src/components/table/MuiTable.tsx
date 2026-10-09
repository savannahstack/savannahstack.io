import { FormattedMessage } from 'react-intl';
import { ElementType, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainCard from '../cards/MainCard';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, fetchRowsByModel, useAppSelector } from '@/lib/store';
import { get_columns_mui_by_model, ModelType, MUITableModelType } from '@/lib/types';

export default function MuiTable({ model }: { model: ModelType }) {
    const cells = get_columns_mui_by_model(model);
    const dispatch = useAppDispatch();
    const rows: MUITableModelType[] = useAppSelector((state) => (state.general.models[model] as MUITableModelType[]) ?? []);

    useEffect(() => {
        dispatch(fetchRowsByModel({ model }));
    }, [dispatch, model]);

    return (
        <MainCard
            data-testid={`mui-table-card-${model}`}
            content={false}
            title={
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    <FormattedMessage id={`${model}_table`} />
                </Typography>
            }
            secondary={
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<AddIcon fontSize="small" />}
                    component={Link as ElementType}
                    to={`/form/${model}/add`}
                    sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 500 }}
                >
                    <FormattedMessage id="add" defaultMessage="Add" />
                </Button>
            }
        >
            <TableContainer sx={{ maxHeight: 380 }}>
                <Table sx={{ minWidth: 350 }} aria-label="table">
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'action.hover' }}>
                            {cells.map((cell: string) => (
                                <TableCell key={cell} align="left" sx={{ py: 1.5, fontWeight: 600, color: 'text.secondary' }}>
                                    <FormattedMessage id={cell} />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={cells.length} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    <Typography variant="body2">No records found</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row: MUITableModelType) => (
                                <TableRow hover key={row.id} sx={{ '&:last-child td': { border: 0 } }}>
                                    {cells.map((cell) => (
                                        <TableCell align="left" key={`${String(cell)}_${String(row[cell])}`} sx={{ py: 1.5 }}>
                                            <Typography variant="body2" sx={{ fontWeight: (cell as string) === 'name' || (cell as string) === 'id' ? 500 : 400 }}>
                                                {String(row[cell])}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
}

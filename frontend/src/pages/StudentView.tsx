import { ElementType, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    SchoolOutlined as SchoolIcon,
    Add as AddIcon,
    PhoneOutlined as PhoneIcon,
    DeleteOutline as DeleteIcon,
    EditOutlined as EditIcon
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';
import MainCard from '@/components/cards/MainCard';
import SubCard from '@/components/cards/SubCard';
import { fetchRowById, deleteRowById } from '@/lib/utils/api';
import { array_obj_to_obj_with_key } from '@/lib/utils/transformation';
import { Assignment, ModelType, Student } from '@/lib/types';
import { useAppDispatch, setUserAndStudentId, useAppSelector } from '@/lib/store';

const StudentProfile = ({ student }: { student: Student }) => {
    const intl = useIntl();
    const navigate = useNavigate();

    const handleDelete = async (id: number) => {
        await deleteRowById({
            model: ModelType.student,
            id,
            message: intl.formatMessage({ id: `success.delete.${ModelType.student}` })
        });
        navigate(`/${ModelType.student}`);
    };

    return (
        <Grid size={{ xs: 12, lg: 4 }}>
            <SubCard
                title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', color: 'background.paper', fontWeight: 600 }}>
                            {student.name ? student.name[0].toUpperCase() : 'S'}
                        </Avatar>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                {student.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Student ID: {student.id}
                            </Typography>
                        </Box>
                    </Box>
                }
                secondary={
                    <Stack direction="row" spacing={0.5}>
                        <IconButton
                            size="small"
                            component={Link as ElementType}
                            to={`/form/${ModelType.student}/${student.id}`}
                            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(student.id)}
                            sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                }
            >
                <List disablePadding>
                    <ListItem
                        sx={{ px: 0, py: 1 }}
                        secondaryAction={
                            <Chip label={student.grade} size="small" variant="outlined" sx={{ fontWeight: 600, borderRadius: '6px' }} />
                        }
                    >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                            <SchoolIcon sx={{ fontSize: '1.2rem', color: 'text.secondary' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    <FormattedMessage id="grade" defaultMessage="Grade" />
                                </Typography>
                            }
                        />
                    </ListItem>

                    <Divider sx={{ my: 0.5 }} />

                    <ListItem
                        sx={{ px: 0, py: 1 }}
                        secondaryAction={
                            <Typography variant="body2" color="text.secondary">
                                {student.phone}
                            </Typography>
                        }
                    >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                            <PhoneIcon sx={{ fontSize: '1.2rem', color: 'text.secondary' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    <FormattedMessage id="phone" defaultMessage="Phone" />
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </SubCard>
        </Grid>
    );
};

const AssignmentCard = ({ assignments }: { assignments: Assignment[] }) => {
    const intl = useIntl();
    const [localAssignments, setLocalAssignments] = useState<Assignment[]>(assignments);

    useEffect(() => {
        setLocalAssignments(assignments);
    }, [assignments]);

    const handleDelete = async (id: number) => {
        await deleteRowById({
            model: ModelType.assignment,
            id,
            message: intl.formatMessage({ id: `success.delete.${ModelType.assignment}` })
        });

        setLocalAssignments((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <MainCard
            content={false}
            title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        <FormattedMessage id={`${ModelType.assignment}_table`} defaultMessage="Assignments" />
                    </Typography>
                    <Chip label={localAssignments.length} size="small" sx={{ height: 22, fontSize: '0.75rem', fontWeight: 600 }} />
                </Box>
            }
            sx={{ height: '100%' }}
            secondary={
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon sx={{ fontSize: '1rem' }} />}
                    component={Link as ElementType}
                    to={`/form/${ModelType.assignment}/add`}
                    sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
                >
                    <FormattedMessage id="add" defaultMessage="Add Assignment" />
                </Button>
            }
        >
            <Box sx={{ p: 2.5 }}>
                {localAssignments.length === 0 ? (
                    <Box sx={{ py: 6, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            No assignments recorded for this student yet.
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {localAssignments.map((assignment) => (
                            <Grid key={assignment.id} size={{ xs: 12, sm: 6 }}>
                                <SubCard
                                    contentSX={{ p: 2 }}
                                    title={
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {assignment.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Stack direction="row" spacing={0.5}>
                                            <IconButton
                                                size="small"
                                                component={Link as ElementType}
                                                to={`/form/${ModelType.assignment}/${assignment.id}`}
                                                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                                            >
                                                <EditIcon sx={{ fontSize: '1rem' }} />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDelete(assignment.id)}
                                                sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                                            >
                                                <DeleteIcon sx={{ fontSize: '1rem' }} />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {assignment.detail}
                                    </Typography>
                                </SubCard>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </MainCard>
    );
};

const StudentView = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams() as { id: string };
    const students: Student[] = useAppSelector((state) => state.general.models[ModelType.student]);
    const [student, setStudent] = useState<Student | null>(array_obj_to_obj_with_key(students ?? [], Number(id), 'id') ?? null);
    const navigate = useNavigate();

    const fetchStudent = useCallback(async () => {
        try {
            const student: Student = (await fetchRowById({
                model: ModelType.student,
                id,
                relation: true,
                relations: ['assignments']
            })) as Student;

            setStudent(student);
            dispatch(
                setUserAndStudentId({
                    user_id: student.teacher_id,
                    student_id: student.id
                })
            );
        } catch {
            navigate('/error', { replace: true });
        }
    }, [id, dispatch, navigate]);

    useEffect(() => {
        void fetchStudent();
    }, [fetchStudent]);

    return (
        student && (
            <Grid container spacing={3}>
                <StudentProfile student={student} />
                <Grid size={{ xs: 12, lg: 8 }}>
                    <AssignmentCard assignments={student.assignments ?? []} />
                </Grid>
            </Grid>
        )
    );
};

export default StudentView;

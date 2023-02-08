import Axios from 'axios';
import { useState, useEffect, useMemo } from "react";

import ModalEdit from "../../../../components/Modals/Paciente/inedex";

import {
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Input,
    IconButton,
    Icon,
} from "@mui/material";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const PaginationTable = () => {
    const baseURL = "https://makeup-api.herokuapp.com/api/v1/products.json";
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [paciente, setPaciente] = useState([]);
    const [busca, setBusca] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        Axios.get(baseURL)
            .then(json => setPaciente(json.data))
    }, [])

    const handleEdit = (id) => {
        Axios.put(`${baseURL}/${id}`)
            .then(() => {
                const editPaciente = paciente.filter((paciente) => paciente.id !== id);
                setPaciente(editPaciente);
            })

    };


    const handleDelete = (id) => {
        Axios.delete(`${baseURL}/${id}`)
            .then(() => {
                const deletePaciente = paciente.filter((paciente) => paciente.id !== id);
                setPaciente(deletePaciente);
            })
        alert("Excluído com sucesso!");
        window.location.reload();
    };

    const handleUpdate = (id) => {
        Axios.put(`${baseURL}/${id}`)
            .then(() => {
                const updatePaciente = paciente.filter((paciente) => paciente.id !== id);
                setPaciente(updatePaciente);
            })
    };

    const quantidadePaciente = paciente;


    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredPaciente = useMemo(() => {
        return paciente.filter((paciente) => {
            return paciente.name.toLowerCase().includes(busca.toLowerCase());
        });
    }, [busca, paciente]);

    return (
        <Box width="100%" overflow="auto">
            <form>
                <Input
                    type="text"
                    placeholder="Pesquisar por nome"
                    value={busca}
                    sx={{ width: 300, marginBottom: '20px', marginTop: '20px' }}
                    onChange={(e) => setBusca(e.target.value)}
                    icon="search"
                />
            </form>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="center">Nascimento</TableCell>
                        <TableCell align="center">CPF</TableCell>
                        <TableCell align="center">SUS</TableCell>
                        <TableCell align="center">Telefone</TableCell>
                        <TableCell align="center">Sexo</TableCell>
                        <TableCell align="center">Responsável</TableCell>
                        <TableCell align="center">Residência</TableCell>
                        <TableCell align="right">Editar</TableCell>
                        <TableCell align="right">Excluir</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPaciente
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((subscriber, index) => (
                            <TableRow key={index} hover>
                                <TableCell align="left">{subscriber.name}</TableCell>
                                <TableCell align="center">{new Date(subscriber.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell align="center">{subscriber.cpf}</TableCell>
                                <TableCell align="center">{subscriber.numero_sus}</TableCell>
                                <TableCell align="center">{subscriber.telefone}</TableCell>
                                <TableCell align="center">{subscriber.sexo}</TableCell>
                                <TableCell align="center">{subscriber.responsavel}</TableCell>
                                <TableCell align="center">{subscriber.residencia}</TableCell>
                                <TableCell align="right">
                                    <ModalEdit />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={handleDelete.bind(this, subscriber.paciente_id)}
                                    >
                                        <Icon color="error">delete</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={quantidadePaciente.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ "aria-label": "Next Page" }}
                backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
        </Box>
    );
};

export default PaginationTable;

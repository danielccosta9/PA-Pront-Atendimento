import Axios from 'axios';
import { useState, useEffect, useMemo } from "react";

import ModalEdit from "../../../../components/Modals/Paciente/inedex";

import {
    Box,
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

const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));

const PaginationTable = () => {
    const baseURL = "http://192.168.1.104:8080/pacientes";
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [paciente, setPaciente] = useState([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        Axios.get(baseURL)
            .then(json => setPaciente(json.data))
    }, [])

    const handleDelete = (id) => {
        Axios.delete(`${baseURL}/${id}`)
            .then(() => {
                const deletePaciente = paciente.filter((paciente) => paciente.id !== id);
                setPaciente(deletePaciente);
            })
        alert("Excluído com sucesso!");
        window.location.reload();
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
            return paciente.nome.toLowerCase().includes(busca.toLowerCase());
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
                                <TableCell align="left">{subscriber.nome}</TableCell>
                                <TableCell align="center">{new Date(subscriber.data_nascimento).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell align="center">{subscriber.cpf}</TableCell>
                                <TableCell align="center">{subscriber.numero_sus}</TableCell>
                                <TableCell align="center">{subscriber.telefone}</TableCell>
                                <TableCell align="center">{subscriber.sexo}</TableCell>
                                <TableCell align="center">{subscriber.responsavel}</TableCell>
                                <TableCell align="center">{subscriber.residencia}</TableCell>
                                <TableCell align="right">
                                    <ModalEdit id={subscriber.id} />
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

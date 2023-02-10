import * as React from 'react';
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import Axios from "axios";

import {
    Autocomplete,
    Button,
    Grid,
    styled,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TextField = styled(TextValidator)(() => ({
    width: "80%",
    marginBottom: "16px",
}));

const buttonSave = {
    padding: '10px 20px',
    marginTop: '50px',
    width: '200px',
    borderRadius: '15px',
};

const buttonCancel = {
    padding: '10px 20px',
    marginTop: '50px',
    marginLeft: '40px',
    width: '200px',
    borderRadius: '15px',
};

const AutoComplete = styled(Autocomplete)(() => ({
    marginBottom: '16px',
}));

const suggestions = [
    { label: 'MASCULINO' },
    { label: 'FEIMININO' },
    { label: 'OUTROS' },
];

const InputCpf = React.forwardRef(function InputCpf(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="000.000.000-00"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const InputSus = React.forwardRef(function InputCpf(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="000 0000 0000 0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const InputDate = React.forwardRef(function InputDate(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="00/00/0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const InputPhone = React.forwardRef(function InputPhone(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(00) 00000-0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

InputCpf.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

InputSus.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

InputDate.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

InputPhone.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [values, setValues] = useState({});

    const edit = (id) => {
        Axios.get(`http://192.168.1.104:8080/paciente/${id}`)
            .then((response) => {
                setValues(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value.toUpperCase();
        setValues(values => ({ ...values, [name]: value }))
    }

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <Icon color="primary">edit</Icon>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ValidatorForm onSubmit={(event) => edit(event)}>
                        <Grid container spacing={6}>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    required
                                    id="nome"
                                    name="nome"
                                    label="Nome do Paciente"
                                    fullWidth
                                    value={values.nome || ""}
                                    onChange={handleChange}
                                    errorMessages={"Nome inválido"}
                                    validators={["required", "minStringLength: 3", "maxStringLength: 100", "matchRegexp:^[a-zA-ZÀ-ú ]*$"]}
                                />
                                <TextField
                                    type="text"
                                    name="responsavel"
                                    id="responsavel"
                                    value={values.responsavel || ""}
                                    onChange={handleChange}
                                    errorMessages={"Nome inválido"}
                                    label="Responsável"
                                    validators={["required", "minStringLength: 3", "maxStringLength: 100", "matchRegexp:^[a-zA-ZÀ-ú ]+$"]}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    required
                                    type="text"
                                    name="residencia"
                                    id="standard-basic"
                                    value={values.residencia || ""}
                                    onChange={handleChange}
                                    errorMessages={["Este campo é obrigatório"]}
                                    label="Residencia"
                                    validators={["required", "minStringLength: 3", "maxStringLength: 100"]}
                                />

                                <AutoComplete
                                    options={suggestions}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Sexo" variant="outlined" required />
                                    )}
                                    onChange={(event, value) => setValues(values => ({ ...values, sexo: value.label }))}
                                />

                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    sx={{ width: '30ch' }}
                                    required
                                    id="cpf"
                                    name="cpf"
                                    label="CPF"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.cpf || ''}
                                    validators={["required", "minStringLength: 14", "maxStringLength: 14", "matchRegexp:^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$"]}
                                    errorMessages={"CPF inválido"}
                                    InputProps={{
                                        inputComponent: InputCpf,
                                    }}
                                />

                                <TextField
                                    sx={{ width: '30ch' }}
                                    required
                                    id="sus"
                                    name="sus"
                                    label="Número do SUS"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.sus || ''}
                                    validators={["required", "minStringLength: 18", "maxStringLength: 18", "matchRegexp:^[0-9]{3} [0-9]{4} [0-9]{4} [0-9]{4}$"]}
                                    errorMessages={"SUS inválido"}
                                    InputProps={{
                                        inputComponent: InputSus,
                                    }}
                                />

                                <TextField
                                    sx={{ width: '30ch' }}
                                    required
                                    id="telefone"
                                    name="telefone"
                                    label="Telefone"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.telefone || ''}
                                    validators={["required", "minStringLength: 15", "maxStringLength: 15"]}
                                    errorMessages={"Telefone inválido"}
                                    InputProps={{
                                        inputComponent: InputPhone,
                                    }}
                                />
                                <TextField
                                    sx={{ width: '30ch' }}
                                    required
                                    type='date'
                                    name="data_nascimento"
                                    value={values.data_nascimento || ""}
                                    onChange={handleChange}
                                    errorMessages={["Este campo é obrigatório"]}
                                    validators={["required"]}
                                    id="formatted-text-mask-input"
                                />
                            </Grid>
                        </Grid >
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            style={buttonSave}
                        >
                            <Icon>save</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Salvar</Span>
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            onClick={handleClose}
                            style={buttonCancel}
                        >
                            <Icon>cancel</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Cancelar</Span>
                        </Button>
                    </ValidatorForm>
                </Box>
            </Modal>
        </div>
    );
}
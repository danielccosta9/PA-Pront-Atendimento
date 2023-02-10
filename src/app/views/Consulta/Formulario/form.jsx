import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { useState } from "react";
import Axios from "axios";

import {
    Button,
    Grid,
    Icon,
    styled,
    TextareaAutosize,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";


const TextField = styled(TextValidator)(() => ({
    width: "80%",
    marginBottom: "16px",
}));

const button = {
    padding: '10px 20px',
    margin: '10px',
    marginTop: '50px',
    width: '200px',
    borderRadius: '15px',
};

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

const InputCrm = React.forwardRef(function InputCrm(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="000000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});


InputSus.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


InputCrm.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


const SimpleForm = () => {
    const baseURL = "http://10.0.2.199:8080/triagem";
    const [values, setValues] = useState({});

    console.log(values);

    function submit(event) {
        event.preventDefault();
        console.log(values);
        Axios.post(baseURL, values)
            .then(() => {
                setValues({});
            })
        alert('Cadastrado com sucesso!');

        setValues({});
    }


    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value.toUpperCase();
        setValues(values => ({ ...values, [name]: value }))
    }


    return (
        <div>
            <ValidatorForm onSubmit={(event) => submit(event)}>
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

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            sx={{ width: '30ch' }}
                            required
                            id="crm"
                            name="crm"
                            label="CRM"
                            fullWidth
                            onChange={handleChange}
                            value={values.crm || ''}
                            validators={["required"]}
                            InputProps={{
                                inputComponent: InputCrm,
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

                        <TextField
                            sx={{ width: '30ch' }}
                            required
                            type='time'
                            name="hora_triagem"
                            value={values.hora_triagem || ""}
                            onChange={handleChange}
                            errorMessages={["Este campo é obrigatório"]}
                            validators={["required"]}
                            id="formatted-text-mask-input"
                        />
                    </Grid>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextareaAutosize
                        placeholder='Observação'
                        name="observacao"
                        value={values.observacao || ""}
                        onChange={handleChange}
                        style={{ width: '76%', height: 100, padding: 10, borderRadius: 10, border: '1px solid #ccc' }}
                        validators={["required", "minStringLength: 3", "maxStringLength: 250", "matchRegexp:^[a-zA-ZÀ-ú ]*$"]}
                        maxLength={250}
                        minLength={3}
                        required
                    />


                </Grid>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={button}
                >
                    <Icon>save</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Salvar</Span>
                </Button>
            </ValidatorForm>
        </div >
    );
};

export default SimpleForm;
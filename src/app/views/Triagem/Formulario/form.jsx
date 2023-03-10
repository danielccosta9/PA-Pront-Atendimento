import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { useState } from "react";
import Axios from "axios";

import {
    Autocomplete,
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

const AutoComplete = styled(Autocomplete)(() => ({
    marginBottom: '16px',
}));

const suggestions = [
    { label: 'AZUL' },
    { label: 'VERDE' },
    { label: 'AMARELO' },
    { label: 'VERMELHO' },
];

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

const InputCoren = React.forwardRef(function InputCoren(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="00.000.000-0"
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


InputCoren.propTypes = {
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
                            errorMessages={"Nome inv??lido"}
                            validators={["required", "minStringLength: 3", "maxStringLength: 100", "matchRegexp:^[a-zA-Z??-?? ]*$"]}
                        />

                        <TextField
                            required
                            id="sus"
                            name="sus"
                            label="N??mero do SUS"
                            fullWidth
                            onChange={handleChange}
                            value={values.sus || ''}
                            validators={["required", "minStringLength: 18", "maxStringLength: 18", "matchRegexp:^[0-9]{3} [0-9]{4} [0-9]{4} [0-9]{4}$"]}
                            errorMessages={"SUS inv??lido"}
                            InputProps={{
                                inputComponent: InputSus,
                            }}
                        />


                        <AutoComplete
                            options={suggestions}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                                <TextField {...params} label="Prioridade" variant="outlined" required />
                            )}
                            onChange={(event, value) => setValues(values => ({ ...values, prioridade: value.label }))}
                        />

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            sx={{ width: '30ch' }}
                            required
                            id="coren"
                            name="coren"
                            label="COREN"
                            fullWidth
                            onChange={handleChange}
                            value={values.coren || ''}
                            validators={["required", "minStringLength: 12", "maxStringLength: 12", "matchRegexp:^[0-9]{2}.[0-9]{3}.[0-9]{3}-[0-9]{1}$"]}
                            InputProps={{
                                inputComponent: InputCoren,
                            }}
                        />

                        <TextField
                            sx={{ width: '30ch' }}
                            required
                            type='date'
                            name="data_nascimento"
                            value={values.data_nascimento || ""}
                            onChange={handleChange}
                            errorMessages={["Este campo ?? obrigat??rio"]}
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
                            errorMessages={["Este campo ?? obrigat??rio"]}
                            validators={["required"]}
                            id="formatted-text-mask-input"
                        />
                    </Grid>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextareaAutosize
                        placeholder='Observa????o'
                        name="observacao"
                        value={values.observacao || ""}
                        onChange={handleChange}
                        style={{ width: '76%', height: 100, padding: 10, borderRadius: 10, border: '1px solid #ccc' }}
                        validators={["required", "minStringLength: 3", "maxStringLength: 250", "matchRegexp:^[a-zA-Z??-?? ]*$"]}
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
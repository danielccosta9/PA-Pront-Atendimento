import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleForm from "./form";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const AppForm = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[
                    { name: "Consulta", path: "/consulta/formulario-consulta" },
                    { name: "Formulário de Consulta Médica" }]} />
            </Box>

            <Stack spacing={3}>
                <SimpleCard title="Formulário de Consulta Médica">
                    <SimpleForm />
                </SimpleCard>

            </Stack>
        </Container>
    );
};

export default AppForm;

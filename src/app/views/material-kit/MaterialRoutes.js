import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

// Administrador
// Cadastrar Enfermeiro ADM
const AppFormCadEfermeira = Loadable(lazy(() => import('../Administrador/Enfermeiro/Cadastrar/index')));
// Listar PacienEnfermeirote ADM
const AppListEfermeira = Loadable(lazy(() => import('../Administrador/Enfermeiro/Listar/index')));
// Cadastrar Medico ADM
const AppFormCadMedico = Loadable(lazy(() => import('../Administrador/Medico/Cadastrar/index')));
// Listar Medico ADM
const AppListMedico = Loadable(lazy(() => import('../Administrador/Medico/Listar/index')));
// Cadastrar Recepcionista ADM
const AppFormCadRecepcionista = Loadable(lazy(() => import('../Administrador/Recepcionista/Cadastrar/index')));
// Listar Recepcionista ADM
const AppListRecepcionista = Loadable(lazy(() => import('../Administrador/Recepcionista/Listar/index')));


// Recepcionista
// Caminho Cadastrar Pacientes
const AppFormCadPaciente = Loadable(lazy(() => import('../Recepcionista/Paciente/Cadastrar/index')));
// Caminho Listar Pacientes
const AppListPaciente = Loadable(lazy(() => import('../Recepcionista/Paciente/Listar/index')));

// Triagem
// Caminho Formulario Triagem
const AppFormTriagem = Loadable(lazy(() => import('../Triagem/Formulario/index')));

// Consulta
// Caminho Formulario Consulta
const AppFormConsulta = Loadable(lazy(() => import('../Consulta/Formulario/index')))


const materialRoutes = [
  // Administrador
  {
    path: '/administrador/cadastrar-enfermeiro',
    element: <AppFormCadEfermeira />,
  },
  {
    path: '/administrador/listar-enfermeiro',
    element: <AppListEfermeira />,
  },
  {
    path: '/administrador/cadastrar-medico',
    element: <AppFormCadMedico />,
  },
  {
    path: '/administrador/listar-medico',
    element: <AppListMedico />,
  },
  {
    path: '/administrador/cadastrar-recepcionista',
    element: <AppFormCadRecepcionista />,
  },
  {
    path: '/administrador/listar-recepcionista',
    element: <AppListRecepcionista />,
  },

  // Triagem
  {
    path: '/triagem/formulario-triagem',
    element: <AppFormTriagem />,
  },

  // Consulta
  {
    path: '/consulta/formulario-consulta',
    element: <AppFormConsulta />,
  },

  // Recepcionista
  {
    path: '/recepcionista/cadastrar-paciente',
    element: <AppFormCadPaciente />
  },
  {
    path: '/recepcionista/listar-paciente',
    element: <AppListPaciente />
  }
];

export default materialRoutes;

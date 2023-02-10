export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'Administrador', type: 'label' },
  {
    name: 'Administrador',
    icon: 'assignment_ind',
    children: [
      {
        name: 'Enfermeiro',
        icon: 'local_hospital',
        children: [
          { name: 'Cadastrar', iconText: 'A', path: '/administrador/cadastrar-enfermeiro' },
          { name: 'Listar', iconText: 'B', path: '/administrador/listar-enfermeiro' },
        ],
      },

      {
        name: 'Médico',
        icon: 'business_center',
        children: [
          { name: 'Cadastrar', iconText: 'A', path: '/administrador/cadastrar-medico' },
          { name: 'Listar', iconText: 'B', path: '/administrador/listar-medico' },
        ],
      },
      {
        name: 'Recepcionista',
        icon: 'person',
        children: [
          { name: 'Cadastrar', iconText: 'A', path: '/administrador/cadastrar-recepcionista' },
          { name: 'Listar', iconText: 'B', path: '/administrador/listar-recepcionista' },
        ],
      },
    ],
  },

  { label: 'Enfermeiro', type: 'label' },
  {
    name: 'Triagem',
    icon: 'local_hospital',
    children: [
      { name: 'Formulário', iconText: 'T', path: '/triagem/formulario-triagem' },
    ],
  },

  { label: 'Médico', type: 'label' },
  {
    name: 'Consulta',
    icon: 'business_center',
    children: [
      { name: 'Formulário', iconText: 'C', path: '/consulta/formulario-consulta' },
    ],
  },

  { label: 'Recepcionista', type: 'label' },
  {
    name: 'Recepcionista',
    icon: 'person',
    children: [
      {
        name: 'Paciente',
        icon: 'accessible',
        children: [
          { name: 'Cadastrar', iconText: 'C', path: '/recepcionista/cadastrar-paciente' },
          { name: 'Listar', iconText: 'L', path: '/recepcionista/listar-paciente' },
        ],
      },
    ],
  },
];

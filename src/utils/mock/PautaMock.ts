import type {
  PautaPage,
  PautaRequestDTO,
  PautaResponseDTO,
  PautaResultadoDTO,
  PautaResultadoPage,
} from '../../interfaces/interfacePauta';

export const mockPautaRequest: PautaRequestDTO = {
  titulo: 'Criação de Biblioteca 24 h',
  descricao:
    'Proposta para estender o horário de funcionamento da biblioteca para 24 h, garantindo acesso contínuo ao acervo físico e digital.',
};

export const mockPautas: PautaResponseDTO[] = [
  {
    id: 1,
    titulo: 'Criação de Biblioteca 24 h',
    descricao: 'Proposta para estender o horário de funcionamento da biblioteca para 24 h.',
    status: 'NAO_VOTADA',
  },
  {
    id: 2,
    titulo: 'Implantação de Wi-Fi Gratuito no Campus',
    descricao: 'Instalar pontos de acesso Wi-Fi de alta velocidade nas áreas comuns do campus.',
    status: 'EM_VOTACAO',
  },
  {
    id: 3,
    titulo: 'Semana Acadêmica de Inovação',
    descricao: 'Organização de uma semana de palestras e workshops sobre inovação tecnológica.',
    status: 'VOTADA',
  },
];

export const mockPautaResultados: PautaResultadoDTO[] = [
  {
    id: 3,
    titulo: 'Semana Acadêmica de Inovação',
    descricao: 'Organização de uma semana de palestras e workshops sobre inovação tecnológica.',
    status: 'VOTADA',
    votosFavor: 312,
    votosContra: 48,
    votosTotais: 360,
    resultado: 'APROVADO',
  },
  {
    id: 4,
    titulo: 'Substituição de Refeitório por Food Trucks',
    descricao:
      'Fechar o refeitório atual e contratar food trucks rotativos como alternativa alimentar no campus.',
    status: 'VOTADA',
    votosFavor: 51,
    votosContra: 209,
    votosTotais: 260,
    resultado: 'REPROVADO',
  },
];

export const mockPautaPage: PautaPage = {
  content: mockPautas,
  pageable: { pageNumber: 0, pageSize: 10 },
  totalElements: mockPautas.length,
  totalPages: 1,
  last: true,
};

export const mockPautaResultadoPage: PautaResultadoPage = {
  content: mockPautaResultados,
  pageable: { pageNumber: 0, pageSize: 10 },
  totalElements: mockPautaResultados.length,
  totalPages: 1,
  last: true,
};

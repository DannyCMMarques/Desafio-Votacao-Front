import type {
  SessaoIniciadaPage,
  SessaoIniciadaResponseDTO,
  SessaoPage,
  SessaoRequestDTO,
  SessaoResponseDTO,
} from '../../interfaces/interfaceSessao';
import { mockPautaResultados } from './PautaMock';
import { mockVotos } from './VotoMock';

export const mockSessaoRequest: SessaoRequestDTO = {
  idPauta: 3,
  duracao: 30,
  unidade: 'MIN',
};

export const mockSessoes: SessaoResponseDTO[] = [
  {
    id: 1,
    pauta: mockPautaResultados[0],
    duracao: 15,
    status: 'NAO_INICIADA',
  },
  {
    id: 2,
    pauta: mockPautaResultados[0],
    duracao: 30,
    status: 'EM_ANDAMENTO',
  },
  {
    id: 3,
    pauta: mockPautaResultados[1],
    duracao: 45,
    status: 'FINALIZADA',
  },
];

export const mockSessoesIniciadas: SessaoIniciadaResponseDTO[] = [
  {
    id: 2,
    pauta: mockPautaResultados[0],
    duracao: 30,
    status: 'EM_ANDAMENTO',
    horarioInicio: '2025-06-22T10:00:00Z',
    horarioFim: null,
    votos: mockVotos,
  },
  {
    id: 3,
    pauta: mockPautaResultados[1],
    duracao: 45,
    status: 'FINALIZADA',
    horarioInicio: '2025-06-21T13:00:00Z',
    horarioFim: '2025-06-21T13:45:00Z',
    votos: mockVotos,
  },
];

export const mockSessaoPage: SessaoPage = {
  content: mockSessoes,
  pageable: { pageNumber: 0, pageSize: 10 },
  totalElements: mockSessoes.length,
  totalPages: 1,
  last: true,
};

export const mockSessaoIniciadaPage: SessaoIniciadaPage = {
  content: mockSessoesIniciadas,
  pageable: { pageNumber: 0, pageSize: 10 },
  totalElements: mockSessoesIniciadas.length,
  totalPages: 1,
  last: true,
};

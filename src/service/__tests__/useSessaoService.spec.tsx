import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import useSessaoService from '../useSessaoService';
import {
  mockSessaoIniciadaPage,
  mockSessaoPage,
  mockSessaoRequest,
  mockSessoes,
  mockSessoesIniciadas,
} from '../../utils/mock/SessaoMock';
import { mockVotoRequestSim, mockVotos } from '../../utils/mock/VotoMock';

type AxiosStub = {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
};

let apiStub: AxiosStub;

vi.mock('../useApiInterceptor', () => ({
  default: () => apiStub,
}));

describe('useSessaoService', () => {
  beforeEach(() => {
    apiStub = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve cadastrar uma sessão e retornar o objeto criado', async () => {
    apiStub.post.mockResolvedValueOnce({ data: mockSessoes[0] });

    const service = useSessaoService();
    const result = await service.cadastrarSessao(mockSessaoRequest);

    expect(apiStub.post).toHaveBeenCalledWith('/api/v1/sessao', mockSessaoRequest);
    expect(result).toEqual(mockSessoes[0]);
  });

  it('deve buscar sessão por ID', async () => {
    apiStub.get.mockResolvedValueOnce({ data: mockSessoesIniciadas[0] });

    const service = useSessaoService();
    const result = await service.getById(2);

    expect(apiStub.get).toHaveBeenCalledWith('/api/v1/sessao/2');
    expect(result).toEqual(mockSessoesIniciadas[0]);
  });

  it('deve listar sessões paginadas', async () => {
    apiStub.get.mockResolvedValueOnce({ data: mockSessaoPage });

    const service = useSessaoService();
    const result = await service.listarSessao();

    expect(apiStub.get).toHaveBeenCalledWith('/api/v1/sessao', {
      params: {
        page: 1,
        size: 10,
        sortBy: 'id',
        direction: 'desc',
      },
    });
    expect(result).toEqual(mockSessaoPage);
  });

  it('deve listar sessões finalizadas quando status="FINALIZADA"', async () => {
    apiStub.get.mockResolvedValueOnce({ data: mockSessaoIniciadaPage });

    const service = useSessaoService();
    const result = await service.listarSessao(1, 10, 'id', 'asc', undefined, 'FINALIZADA');

    expect(apiStub.get).toHaveBeenCalledWith('/api/v1/sessao', {
      params: {
        page: 1,
        size: 10,
        sortBy: 'id',
        direction: 'asc',
        status: 'FINALIZADA',
      },
    });
    expect(result).toEqual(mockSessaoIniciadaPage);
  });

  it('deve atualizar uma sessão existente', async () => {
    const sessaoAtualizada = { ...mockSessoes[0], duracao: 20 };
    apiStub.put.mockResolvedValueOnce({ data: sessaoAtualizada });

    const service = useSessaoService();
    const result = await service.atualizarSessao(1, mockSessaoRequest);

    expect(apiStub.put).toHaveBeenCalledWith('/api/v1/sessao/1', mockSessaoRequest);
    expect(result).toEqual(sessaoAtualizada);
  });

  it('deve deletar uma sessão', async () => {
    apiStub.delete.mockResolvedValueOnce({});

    const service = useSessaoService();
    await service.deletarSessao(3);

    expect(apiStub.delete).toHaveBeenCalledWith('/api/v1/sessao/3');
  });

  it('deve iniciar uma sessão', async () => {
    apiStub.patch.mockResolvedValueOnce({ data: mockSessoesIniciadas[0] });

    const service = useSessaoService();
    const result = await service.iniciarSessao(2);

    expect(apiStub.patch).toHaveBeenCalledWith('/api/v1/sessao/2/start');
    expect(result).toEqual(mockSessoesIniciadas[0]);
  });

  it('deve registrar um voto na sessão', async () => {
    apiStub.post.mockResolvedValueOnce({ data: mockVotos[0] });

    const service = useSessaoService();
    const result = await service.votarSessao(2, mockVotoRequestSim);

    expect(apiStub.post).toHaveBeenCalledWith('/api/v1/sessao/2/votar', mockVotoRequestSim);
    expect(result).toEqual(mockVotos[0]);
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import usePautaService from '../usePautaService';
import {
  mockPautaPage,
  mockPautaRequest,
  mockPautaResultadoPage,
  mockPautas,
} from '../../utils/mock/PautaMock';

type AxiosLike = {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

let mockedApi: AxiosLike;

vi.mock('../useApiInterceptor', () => ({
  default: () => mockedApi,
}));

describe('usePautaService', () => {
  beforeEach(() => {
    mockedApi = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('deve cadastrar uma pauta e retornar o objeto criado', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: mockPautas[0] });

    const service = usePautaService();
    const result = await service.cadastrarPauta(mockPautaRequest);

    expect(mockedApi.post).toHaveBeenCalledWith('/api/v1/pauta', mockPautaRequest);
    expect(result).toEqual(mockPautas[0]);
  });

  it('deve buscar pauta por ID', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockPautas[1] });

    const service = usePautaService();
    const result = await service.getById(2);

    expect(mockedApi.get).toHaveBeenCalledWith('/api/v1/pauta/2');
    expect(result).toEqual(mockPautas[1]);
  });

  it('deve listar pautas paginadas', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockPautaPage });

    const service = usePautaService();
    const result = await service.listarPauta();

    expect(mockedApi.get).toHaveBeenCalledWith('/api/v1/pauta', {
      params: {
        page: 1,
        size: 10,
        sortBy: 'id',
        direction: 'desc',
      },
    });
    expect(result).toEqual(mockPautaPage);
  });

  it('deve listar pautas com votos/resultado quando status="VOTADA"', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockPautaResultadoPage });

    const service = usePautaService();
    const result = await service.listarPauta(1, 10, 'id', 'asc', undefined, 'VOTADA');

    expect(mockedApi.get).toHaveBeenCalledWith('/api/v1/pauta', {
      params: {
        page: 1,
        size: 10,
        sortBy: 'id',
        direction: 'asc',
        status: 'VOTADA',
      },
    });
    expect(result).toEqual(mockPautaResultadoPage);
  });

  it('deve atualizar uma pauta existente', async () => {
    const pautaAtualizada = { ...mockPautas[0], titulo: 'Título Atualizado' };
    mockedApi.put.mockResolvedValueOnce({ data: pautaAtualizada });

    const service = usePautaService();
    const result = await service.atualizarPautas(1, mockPautaRequest);

    expect(mockedApi.put).toHaveBeenCalledWith('/api/v1/pauta/1', mockPautaRequest);
    expect(result).toEqual(pautaAtualizada);
  });

  it('deve deletar uma pauta', async () => {
    mockedApi.delete.mockResolvedValueOnce({});

    const service = usePautaService();
    await service.deletarPauta(3);

    expect(mockedApi.delete).toHaveBeenCalledWith('/api/v1/pauta/3');
  });
});

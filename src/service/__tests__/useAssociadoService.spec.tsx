import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import useAssociadoService from '../useAssociadoService';
import {
  mockAssociadoPage,
  mockAssociadoRequest,
  mockAssociados,
} from '../../utils/mock/AssociadoMock';

type AxiosStub = {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

let apiStub: AxiosStub;

vi.mock('../useApiInterceptor', () => ({
  default: () => apiStub,
}));

describe('useAssociadoService', () => {
  beforeEach(() => {
    apiStub = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve cadastrar um associado e retornar o objeto criado', async () => {
    apiStub.post.mockResolvedValueOnce({ data: mockAssociados[0] });

    const service = useAssociadoService();
    const result = await service.cadastrarAssociado(mockAssociadoRequest);

    expect(apiStub.post).toHaveBeenCalledWith('/api/v1/associado', mockAssociadoRequest);
    expect(result).toEqual(mockAssociados[0]);
  });

  it('deve buscar associado por ID', async () => {
    apiStub.get.mockResolvedValueOnce({ data: mockAssociados[1] });

    const service = useAssociadoService();
    const result = await service.getById(102);

    expect(apiStub.get).toHaveBeenCalledWith('/api/v1/associado/102');
    expect(result).toEqual(mockAssociados[1]);
  });

  it('deve listar associados paginados', async () => {
    apiStub.get.mockResolvedValueOnce({ data: mockAssociadoPage });

    const service = useAssociadoService();
    const result = await service.listarAssociado();

    expect(apiStub.get).toHaveBeenCalledWith('/api/v1/associado', {
      params: {
        page: 1,
        size: 10,
        sortBy: 'nome',
        direction: 'desc',
      },
    });
    expect(result).toEqual(mockAssociadoPage);
  });

  it('deve listar associados filtrando por cpf', async () => {
    apiStub.get.mockResolvedValueOnce({ data: mockAssociadoPage });

    const service = useAssociadoService();
    const result = await service.listarAssociado(1, 10, 'nome', 'asc', '12345678901');

    expect(apiStub.get).toHaveBeenCalledWith('/api/v1/associado', {
      params: {
        page: 1,
        size: 10,
        sortBy: 'nome',
        direction: 'asc',
        cpf: '12345678901',
      },
    });
    expect(result).toEqual(mockAssociadoPage);
  });

  it('deve atualizar um associado existente', async () => {
    const associadoAtualizado = { ...mockAssociados[0], nome: 'Fulano Atualizado' };
    apiStub.put.mockResolvedValueOnce({ data: associadoAtualizado });

    const service = useAssociadoService();
    const result = await service.atualizarAssociado(101, mockAssociadoRequest);

    expect(apiStub.put).toHaveBeenCalledWith('/api/v1/associado/101', mockAssociadoRequest);
    expect(result).toEqual(associadoAtualizado);
  });

  it('deve deletar um associado', async () => {
    apiStub.delete.mockResolvedValueOnce({});

    const service = useAssociadoService();
    await service.deletarAssociado(103);

    expect(apiStub.delete).toHaveBeenCalledWith('/api/v1/associado/103');
  });
});

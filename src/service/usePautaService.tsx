import type {
  PautaPage,
  PautaRequestDTO,
  PautaResponseDTO,
  PautaResultadoDTO,
  PautaResultadoPage,
} from './interfaces/interfacePauta';

import useApiInterceptor from './useApiInterceptor';

function usePautaService() {
  const api = useApiInterceptor();
  const url = '/api/v1/pauta';

  async function cadastrarPauta(
    pauta: PautaRequestDTO,
  ): Promise<PautaResponseDTO | PautaResultadoDTO> {
    const response = await api.post<PautaResponseDTO | PautaResultadoDTO>(url, pauta);
    return response.data;
  }

  async function getById(id: number): Promise<PautaResponseDTO | PautaResultadoDTO> {
    const response = await api.get<PautaResponseDTO | PautaResultadoDTO>(`${url}/${id}`);
    return response.data;
  }
  async function listarPauta(
    page: number = 1,
    size: number = 10,
    sortBy: string = 'id',
    direction: 'asc' | 'desc' = 'desc',
    titulo?: string,
    status?: string,
  ): Promise<PautaPage | PautaResultadoPage> {
    const response = await api.get<PautaPage | PautaResultadoPage>(url, {
      params: {
        page,
        size,
        sortBy,
        direction,
        ...(titulo && { titulo }),
        ...(status && { status }),
      },
    });

    return response.data;
  }

  async function atualizarPautas(
    id: number,
    pauta: PautaRequestDTO,
  ): Promise<PautaResponseDTO | PautaResultadoDTO> {
    const response = await api.put<PautaResponseDTO | PautaResultadoDTO>(`${url}/${id}`, pauta);
    return response.data;
  }

  async function deletarPauta(id: number): Promise<void> {
    await api.delete<void>(`${url}/${id}`);
  }

  return {
    cadastrarPauta,
    getById,
    listarPauta,
    atualizarPautas,
    deletarPauta,
  };
}

export default usePautaService;

import type {
  SessaoIniciadaPage,
  SessaoIniciadaResponseDTO,
  SessaoPage,
  SessaoRequestDTO,
  SessaoResponseDTO,
} from '../interfaces/interfaceSessao';
import type { VotoRequestDTO, VotoResponseDTO } from '../interfaces/interfaceVotacao';
import useApiInterceptor from './useApiInterceptor';

function useSessaoService() {
  const api = useApiInterceptor();
  const url = '/api/v1/sessao';

  async function cadastrarSessao(sessao: SessaoRequestDTO): Promise<SessaoResponseDTO> {
    const response = await api.post<SessaoResponseDTO | SessaoIniciadaResponseDTO>(url, sessao);
    return response.data;
  }

  async function getById(id: number): Promise<SessaoResponseDTO | SessaoIniciadaResponseDTO> {
    const response = await api.get<SessaoResponseDTO | SessaoIniciadaResponseDTO>(`${url}/${id}`);
    return response.data;
  }

  async function listarSessao(
    page: number = 1,
    size: number = 10,
    sortBy: string = 'id',
    direction: 'asc' | 'desc' = 'desc',
    pautaId?: number,
    status?: 'NAO_INICIADA' | 'EM_ANDAMENTO' | 'FINALIZADA',
  ): Promise<SessaoPage | SessaoIniciadaPage> {
    const response = await api.get<SessaoPage | SessaoIniciadaPage>(url, {
      params: {
        page,
        size,
        sortBy,
        direction,
        ...(pautaId !== undefined && { pautaId }),
        ...(status && { status }),
      },
    });

    return response.data;
  }
  async function atualizarSessao(
    id: number,
    sessao: SessaoRequestDTO,
  ): Promise<SessaoResponseDTO | SessaoIniciadaResponseDTO> {
    const response = await api.put<SessaoResponseDTO | SessaoIniciadaResponseDTO>(
      `${url}/${id}`,
      sessao,
    );
    return response.data;
  }

  async function deletarSessao(id: number): Promise<void> {
    await api.delete<void>(`${url}/${id}`);
  }

  async function iniciarSessao(id: number): Promise<SessaoIniciadaResponseDTO> {
    const response = await api.patch<SessaoIniciadaResponseDTO>(`${url}/${id}/start`);
    return response.data;
  }

  async function votarSessao(id: number, voto: VotoRequestDTO): Promise<VotoResponseDTO> {
    const response = await api.post<VotoResponseDTO>(`${url}/${id}/votar`, voto);
    return response.data;
  }

  return {
    cadastrarSessao,
    getById,
    listarSessao,
    atualizarSessao,
    deletarSessao,
    iniciarSessao,
    votarSessao,
  };
}

export default useSessaoService;

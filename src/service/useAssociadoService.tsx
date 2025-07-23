import type {
  AssociadoPage,
  AssociadoRequestDTO,
  AssociadoResponseDTO,
} from '../interfaces/interfaces/interfaceAssociados';

import useApiInterceptor from './useApiInterceptor';

function useAssociadoService() {
  const api = useApiInterceptor();
  const url = '/api/v1/associado';

  async function cadastrarAssociado(associado: AssociadoRequestDTO): Promise<AssociadoResponseDTO> {
    const response = await api.post<AssociadoResponseDTO>(url, associado);
    return response.data;
  }

  async function getById(id: number): Promise<AssociadoResponseDTO> {
    const response = await api.get<AssociadoResponseDTO>(`${url}/${id}`);
    return response.data;
  }

  async function listarAssociado(
    page: number = 1,
    size: number = 10,
    sortBy: string = 'nome',
    direction: 'asc' | 'desc' = 'desc',
    cpf?: string,
  ): Promise<AssociadoPage> {
    const response = await api.get<AssociadoPage>(url, {
      params: {
        page,
        size,
        sortBy,
        direction,
        ...(cpf && { cpf }),
      },
    });

    return response.data;
  }

  async function atualizarAssociado(
    id: number,
    associado: AssociadoRequestDTO,
  ): Promise<AssociadoResponseDTO> {
    const response = await api.put<AssociadoResponseDTO>(`${url}/${id}`, associado);
    return response.data;
  }

  async function deletarAssociado(id: number): Promise<void> {
    await api.delete<void>(`${url}/${id}`);
  }

  return {
    cadastrarAssociado,
    getById,
    listarAssociado,
    atualizarAssociado,
    deletarAssociado,
  };
}

export default useAssociadoService;

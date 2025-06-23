export interface PautaRequestDTO {
  titulo: string;
  descricao: string;

}

export interface PautaResponseDTO {
  id: number;
  titulo: string;
  descricao: string;
  status: 'NAO_VOTADA' | "EM_VOTACAO" | "VOTADA";
}

export interface PautaResultadoDTO extends PautaResponseDTO {
  votosContra: number;
  votosFavor: number;
  votosTotais: number;
  resultado: 'APROVADO' | 'REPROVADO' | 'INDECISIVO' | 'EM_ANDAMENTO';

}

export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;

}

export type PautaPage = Page<PautaResponseDTO>;
export type PautaResultadoPage = Page<PautaResultadoDTO>;



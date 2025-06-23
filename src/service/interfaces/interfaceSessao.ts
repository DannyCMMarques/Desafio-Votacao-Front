import type { PautaResultadoDTO } from "./interfacePauta";
import type { VotoResponseDTO } from "./interfaceVotacao";

export interface SessaoRequestDTO {
  idPauta: number;
  duracao: number;
  unidade: 'MIN' | 'SEG' | 'H';
}


export interface SessaoResponseDTO {
  id: number;
  pauta: PautaResultadoDTO;
  duracao: number;
  status: 'NAO_INICIADA' | 'EM_ANDAMENTO' | 'FINALIZADA';
}

export interface SessaoIniciadaResponseDTO extends SessaoResponseDTO {
  pauta: PautaResultadoDTO;
  horarioInicio: string | null;
  horarioFim: string | null;
  votos: VotoResponseDTO[];
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

export type SessaoPage = Page<SessaoResponseDTO>;
export type SessaoIniciadaPage = Page<SessaoIniciadaResponseDTO>;
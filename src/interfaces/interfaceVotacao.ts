import type { AssociadoResponseDTO } from './interfaceAssociados';

export interface VotoRequestDTO {
  voto: boolean;
  associado: number;
}

export interface VotoResponseDTO {
  id: number;
  voto: 'SIM' | 'NAO';
  associado: AssociadoResponseDTO;
}

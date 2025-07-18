import type { VotoResponseDTO } from '../../../service/interfaces/interfaceVotacao';

export interface HistoricoVotosProps {
  votos: VotoResponseDTO[];
  isConcluida?: boolean;
}

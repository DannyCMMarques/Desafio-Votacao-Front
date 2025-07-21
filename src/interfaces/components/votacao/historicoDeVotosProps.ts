import type { VotoResponseDTO } from '../../interfaces/interfaceVotacao';

export interface HistoricoVotosProps {
  votos: VotoResponseDTO[];
  isConcluida?: boolean;
}

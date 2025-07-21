import type { SessaoIniciadaResponseDTO } from '../interfaces/interfaceSessao';

export interface VisualizarPautaProps {
  id: number;
  sessaoDaPauta?: SessaoIniciadaResponseDTO;
}

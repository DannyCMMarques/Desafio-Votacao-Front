import type { SessaoIniciadaResponseDTO } from '../../service/interfaces/interfaceSessao';

export interface VisualizarPautaProps {
  id: number;
  sessaoDaPauta?: SessaoIniciadaResponseDTO;
}

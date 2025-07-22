import type { SessaoIniciadaResponseDTO } from '../../interfaces/interfaceSessao';

export interface CabecalhoSessaoProps {
  data: SessaoIniciadaResponseDTO;
  onExpired: () => void;
}

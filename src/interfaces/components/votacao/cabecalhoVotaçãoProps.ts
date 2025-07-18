import type { SessaoIniciadaResponseDTO } from '../../../service/interfaces/interfaceSessao';

export interface CabecalhoSessaoProps {
  data: SessaoIniciadaResponseDTO;
  onExpired: () => void;
}

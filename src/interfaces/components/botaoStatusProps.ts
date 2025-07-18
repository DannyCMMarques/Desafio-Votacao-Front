import type { Status } from '../componentInterface';

export interface BotaoStatusProps {
  status: Status;
  isSessao: boolean;
  id?: number;
  onVerResultados?: (id: number) => void;
  onIniciarSessao?: (id: number) => void;
  onParticiparSessao?: (id: number) => void;
}

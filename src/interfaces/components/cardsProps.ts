import type { ReactNode } from 'react';
import type { ResultadoPauta } from '../../utils/enums/PautaEnum';
import type { Status } from '../componentInterface';

export interface CardsProps {
  icon?: ReactNode;
  iconeExpandir?: ReactNode;
  descricao?: string;
  status: Status;
  resultado?: ResultadoPauta;
  horarioInicio?: string | null;
  horarioFim?: string | null;
  duracao?: number;
  isSessao?: boolean;
  pautaTitulo?: string;
  id?: number;
  onEditar?: (id: number) => void;
  onExcluir?: (id: number) => void;
  onVerResultados?: (id: number) => void;
  onIniciarSessao?: (id: number) => void;
  onParticiparSessao?: (id: number) => void;
}

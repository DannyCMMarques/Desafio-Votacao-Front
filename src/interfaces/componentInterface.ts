import type { JSX } from 'react';
import type { ReactNode } from 'react';
import type { StatusSessao } from '../utils/enums/StatusSessao';
import type { StatusPauta } from '../utils/enums/PautaEnum';

export type Status = StatusSessao | StatusPauta;

export interface StatusInfo {
  cor: string;
  texto: string;
  icone?: JSX.Element;
  mostrarVerMais?: boolean;
  acao?: () => void;
}

export interface Handlers {
  onVerResultados?: (id: number) => void;
  onIniciarSessao?: (id: number) => void;
  onParticiparSessao?: (id: number) => void;
}

export interface CardsProps {
  icon?: ReactNode;
  iconeExpandir?: ReactNode;
  descricao?: string;
  status: string;
  resultado?: string;
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

export interface BotaoStatusProps {
  status: Status;
  isSessao: boolean;
  id?: number;
  onVerResultados?: (id: number) => void;
  onIniciarSessao?: (id: number) => void;
  onParticiparSessao?: (id: number) => void;
}

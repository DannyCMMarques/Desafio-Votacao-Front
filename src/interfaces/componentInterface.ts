import type { JSX } from 'react';
import type { StatusPauta } from '../utils/enums/PautaEnum';
import type { StatusSessao } from '../utils/enums/StatusSessao';

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

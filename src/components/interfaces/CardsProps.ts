import type { ReactNode } from 'react';

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

import type { ReactNode } from 'react';

export type ModalProps = {
  children: ReactNode;
  onFechar?: () => void;
  tamanho?: Size;
};

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalVisualizarDataProps {
  id: number;
  isSessao: boolean;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

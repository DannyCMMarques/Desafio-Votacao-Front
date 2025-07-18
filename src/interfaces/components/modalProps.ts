import type { ReactNode } from 'react';

export type ModalProps = {
  children: ReactNode;
  onFechar?: () => void;
  tamanho?: 'sm' | 'md' | 'lg' | 'xl';
};

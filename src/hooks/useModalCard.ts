import { useState, useCallback } from 'react';
import type { ModalCardState } from '../interfaces/hooks/useModalCardInterface';

export function useModalCard() {
  const [modal, setModal] = useState<ModalCardState | null>(null);

  const abrirFormulario = useCallback((id?: number) => {
    setModal({ tipo: 'formulario', id });
  }, []);

  const abrirResultado = useCallback((id: number) => {
    setModal({ tipo: 'resultado', id });
  }, []);

  const fecharModal = useCallback(() => {
    setModal(null);
  }, []);

  return {
    modal,
    abrirFormulario,
    abrirResultado,
    fecharModal,
  };
}

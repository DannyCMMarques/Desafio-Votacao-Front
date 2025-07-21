// hooks/useModal.ts
import { useState, useCallback } from 'react';

export function useModal(initial = false) {
  const [isOpenModal, setIsOpenModal] = useState(initial);

  const handleAbrirModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleFecharModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return {
    isOpenModal,
    handleAbrirModal,
    handleFecharModal,
  };
}

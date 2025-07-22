import { useCallback } from 'react';

export function useAcoesItem(
  id?: number,
  aoEditar?: (id: number) => void,
  aoExcluir?: (id: number) => void,
) {
  const aoClicarEditar = useCallback(() => {
    if (id) aoEditar?.(id);
  }, [id, aoEditar]);

  const aoClicarExcluir = useCallback(() => {
    if (id) aoExcluir?.(id);
  }, [id, aoExcluir]);

  return {
    aoClicarEditar,
    aoClicarExcluir,
  };
}

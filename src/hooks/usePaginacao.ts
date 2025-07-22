import { useState } from 'react';

export const usePaginacao = () => {
  const [pagina, setPagina] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItens, setTotalItens] = useState<number>(0);
  const size = 10;

  return {
    pagina,
    setPagina,
    totalPages,
    setTotalPages,
    totalItens,
    setTotalItens,
    size,
  };
};

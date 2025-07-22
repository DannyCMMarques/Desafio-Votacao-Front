import { useCallback, useEffect, useState } from 'react';
import { usePaginacao } from '../usePaginacao';
import usePautaService from '../../service/usePautaService';
import type { PautaPage, PautaResponseDTO } from '../../interfaces/interfacePauta';

export const useExibirPautasPaginadas = () => {
  const { pagina, setPagina, totalPages, setTotalPages, totalItens, setTotalItens, size } =
    usePaginacao();
  const pautaService = usePautaService();
  const [pautas, setPautas] = useState<PautaResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const exibirPautas = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      try {
        const response: PautaPage = await pautaService.listarPauta(page, size);
        setPautas(response?.content);
        setTotalItens(response?.totalElements);
        setTotalPages(response.totalPages);
      } catch (err) {
        console.error(err, ' erro ao buscar pauta');
      } finally {
        setIsLoading(false);
      }
    },
    [pautaService],
  );
  useEffect(() => {
    exibirPautas(pagina);
  }, [pagina, totalItens]);

  return {
    exibirPautas,
    setPagina,
    totalPages,
    totalItens,
    pautas,
    isLoading,
    pagina,
  };
};

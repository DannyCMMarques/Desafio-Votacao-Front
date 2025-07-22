import { useCallback, useEffect, useState } from 'react';
import type { SessaoPage, SessaoResponseDTO } from '../../interfaces/interfaceSessao';
import useSessaoService from '../../service/useSessaoService';
import { usePaginacao } from '../usePaginacao';

export const useSessaoPaginacao = () => {
  const sessaoService = useSessaoService();
  const { pagina, setPagina, totalPages, setTotalPages, totalItens, setTotalItens, size } =
    usePaginacao();

  const [sessoes, setSessoes] = useState<SessaoResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const exibirSessoes = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      try {
        const { content, totalPages, totalElements } = (await sessaoService.listarSessao(
          page,
          size,
        )) as SessaoPage;
        setSessoes(content);
        setTotalPages(totalPages);
        setTotalItens(totalElements);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [sessaoService, size, setTotalPages, setTotalItens],
  );

  useEffect(() => {
    exibirSessoes(pagina);
  }, [pagina]);

  return {
    pagina,
    setPagina,
    totalPages,
    totalItens,
    sessoes,
    isLoading,
    exibirSessoes,
  };
};

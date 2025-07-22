import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useObterSessaoPorPauta } from './useObterSessaoPorPauta';

export function useSessaoNavigation() {
  const navigate = useNavigate();
  const { obterIdSessaoPorPauta } = useObterSessaoPorPauta();
  const navegarParaSessao = useCallback(
    async (idPauta: number) => {
      const idSessao = await obterIdSessaoPorPauta(idPauta);
      if (idSessao !== undefined) {
        navigate(`/sessao/${idSessao}`);
      } else {
        toast.error('Sessão não encontrada');
      }
    },
    [navigate],
  );

  return { navegarParaSessao };
}

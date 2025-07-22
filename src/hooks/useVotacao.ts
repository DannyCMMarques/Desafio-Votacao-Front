import { useCallback } from 'react';
import { toast } from 'react-toastify';
import useSessaoService from '../service/useSessaoService';
import type { VotoRequestDTO } from '../interfaces/interfaceVotacao';

export function useVotacao(onSuccess: () => void) {
  const service = useSessaoService();

  const votar = useCallback(
    async (idSessao: number, voto: VotoRequestDTO) => {
      try {
        await service.votarSessao(idSessao, voto);
        toast.success('Voto computado com sucesso');
        onSuccess();
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Erro ao computar voto');
        console.error(err);
      }
    },
    [service, onSuccess],
  );

  return { votar };
}

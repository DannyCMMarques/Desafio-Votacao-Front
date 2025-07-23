import { useCallback, useEffect, useState } from 'react';

import usePautaService from '../../service/usePautaService';
import type { PautaResultadoDTO } from '../../interfaces/interfacePauta';

export function useBuscarPautaPorId(id: number) {
  const pautaService = usePautaService();

  const [isLoading, setIsLoading] = useState(false);
  const [pauta, setPauta] = useState<PautaResultadoDTO>();

  const buscarPautaById = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await pautaService.getById(id);
      setPauta(data as PautaResultadoDTO);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    buscarPautaById();
  }, [buscarPautaById]);
  return {
    pauta,
    isLoading,
    refresh: buscarPautaById,
  };
}

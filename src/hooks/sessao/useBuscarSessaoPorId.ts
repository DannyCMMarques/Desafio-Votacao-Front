import { useCallback, useEffect, useState } from 'react';
import type {
  SessaoIniciadaResponseDTO,
  SessaoResponseDTO,
} from '../../interfaces/interfaceSessao';
import useSessaoService from '../../service/useSessaoService';

export function useBuscarSessaoPorId(id: number) {
  const servico = useSessaoService();

  const [sessao, setSessao] = useState<SessaoResponseDTO | SessaoIniciadaResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const buscarSessao = useCallback(async () => {
    setLoading(true);
    try {
      const dados = await servico.getById(id);
      setSessao(dados);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    buscarSessao();
  }, [buscarSessao]);

  return {
    sessao,
    loading,
    refresh: buscarSessao,
  };
}

import { useState } from 'react';
import type { SessaoIniciadaResponseDTO } from '../../interfaces/interfaceSessao';
import useSessaoService from '../../service/useSessaoService';

export const useObterSessaoPorPauta = () => {
  const [sessaoDaPauta, setSessaoDaPauta] = useState<SessaoIniciadaResponseDTO | undefined>();
  const sessaoService = useSessaoService();

  const obterIdSessaoPorPauta = async (idPauta: number): Promise<number | undefined> => {
    try {
      const response = await sessaoService.listarSessao(1, 10, 'id', 'desc', idPauta);
      const sessao = response.content?.[0] as SessaoIniciadaResponseDTO;
      setSessaoDaPauta(sessao);
      if (sessao?.id !== undefined) {
        return sessao.id;
      }
    } catch (err) {
      console.error('Erro ao obter sessão', err);
    }
  };

  return {
    obterIdSessaoPorPauta,
    sessaoDaPauta,
  };
};

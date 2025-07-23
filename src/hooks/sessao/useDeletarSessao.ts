import { toast } from 'react-toastify';
import useSessaoService from '../../service/useSessaoService';
import type { useDeletarSessaoProps } from '../../interfaces/hooks/useDeletarSessaoProps';

export const useDeletarSessao = ({ exibirSessoes, pagina }: useDeletarSessaoProps) => {
  const sessaoService = useSessaoService();

  const onDelete = async (id: number) => {
    try {
      await sessaoService.deletarSessao(id);
      toast.success('Sessão excluída com sucesso');
      exibirSessoes(pagina);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao deletar sessão');
    }
  };

  return {
    onDelete,
  };
};

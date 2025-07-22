import { toast } from 'react-toastify';
import usePautaService from '../../service/usePautaService';
import type { useDeletarPautasProps } from '../../interfaces/hooks/useDeletarPautaProps';
export const useDeletarPautas = ({ exibirPautas, pagina }: useDeletarPautasProps) => {
  const pautaService = usePautaService();

  const onDelete = async (id: number) => {
    try {
      await pautaService.deletarPauta(id);
      toast.success('Pauta excluída com sucesso');
      exibirPautas(pagina);
    } catch (err: unknown) {
      toast.error(err?.response.data.message);
    }
  };

  return {
    onDelete,
  };
};

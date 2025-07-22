import { useNavigate } from 'react-router-dom';
import useSessaoService from '../../service/useSessaoService';
import type { UseIniciarSessaoProps } from '../../interfaces/hooks/useIniciarSessaoProps';

export const useIniciarSessao = ({ exibirSessoes, pagina }: UseIniciarSessaoProps) => {
  const navigate = useNavigate();
  const sessaoService = useSessaoService();

  const iniciarSessao = async (id: number) => {
    try {
      await sessaoService.iniciarSessao(id);
      exibirSessoes(pagina);
    } catch (err) {
      console.error('erro ao iniciar sessao', err);
    }
  };
  const handleNavegarSessao = (id: number) => {
    navigate(`/sessao/${id}`);
  };

  const handleIniciarSessao = async (id: number) => {
    try {
      await iniciarSessao(id);
      handleNavegarSessao(id);
    } catch (err) {
      console.error('Erro ao iniciar sessão:', err);
    }
  };
  return {
    handleIniciarSessao,
    handleNavegarSessao,
  };
};

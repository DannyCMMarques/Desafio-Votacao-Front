import { FaCheckCircle, FaPlay, FaUsers } from 'react-icons/fa';
import type { Handlers, StatusInfo } from '../../interfaces/componentInterface';
import { estilos } from '../constants/estilos';
import { StatusSessao } from '../enums/StatusSessao';

export const getSessaoStatusMap = (
  id: number | undefined,
  handlers: Handlers,
): Record<string, StatusInfo> => ({
  [StatusSessao.NAO_INICIADA]: {
    cor: estilos.amarelo,
    texto: 'Iniciar Sessão',
    icone: <FaPlay className="mr-2" />,
    mostrarVerMais: true,
    acao: () => id && handlers.onIniciarSessao?.(id),
  },
  [StatusSessao.EM_ANDAMENTO]: {
    cor: estilos.azul,
    texto: 'Participar Sessão',
    icone: <FaUsers className="mr-2" />,
    acao: () => id && handlers.onParticiparSessao?.(id),
  },
  [StatusSessao.FINALIZADA]: {
    cor: estilos.cinza,
    texto: 'Ver Resultados',
    icone: <FaCheckCircle className="mr-2" />,
    acao: () => id && handlers.onVerResultados?.(id),
  },
});

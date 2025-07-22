import { FaClock, FaVoteYea, FaCheckCircle } from 'react-icons/fa';
import { StatusPauta } from '../enums/PautaEnum';
import type { Handlers, StatusInfo } from '../../interfaces/componentInterface';
import { estilos } from '../constants/estilos';

export const getComumStatusMap = (
  id: number | undefined,
  handlers: Handlers,
): Record<string, StatusInfo> => ({
  [StatusPauta.NAO_VOTADA]: {
    cor: estilos.cinzaEscuro,
    texto: 'Aguardando Início',
    icone: <FaClock className="mr-2" />,
    mostrarVerMais: true,
  },
  [StatusPauta.EM_VOTACAO]: {
    cor: estilos.azul,
    texto: 'Votar',
    icone: <FaVoteYea className="mr-2" />,
    acao: () => id && handlers.onParticiparSessao?.(id),
  },
  [StatusPauta.VOTADA]: {
    cor: estilos.cinza,
    texto: 'Ver Resultados',
    icone: <FaCheckCircle className="mr-2" />,
    acao: () => id && handlers.onVerResultados?.(id),
  },
});

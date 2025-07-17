import { estilos } from '../constants/estilos';
import type { Handlers, Status, StatusInfo } from '../../interfaces/componentInterface';
import { getSessaoStatusMap } from './getStatusSessaoMap';
import { getComumStatusMap } from './getCommonStatusMap';

export const getStatusInfo = (
  status: Status,
  isSessao: boolean,
  id: number | undefined,
  handlers: Handlers,
): StatusInfo => {
  const map = isSessao ? getSessaoStatusMap(id, handlers) : getComumStatusMap(id, handlers);

  return (
    map[status as keyof typeof map] ?? {
      cor: estilos.padrao,
      texto: 'Desconhecido',
    }
  );
};

import { useMemo } from 'react';
import ModalVisualizarData from '../modal/modal-exibicao';
import { getStatusInfo } from '../../utils/helper/getStatusInfo';
import type { BotaoStatusProps } from '../../interfaces/components/botaoStatusProps';

const BotaoStatusComponent = ({
  status,
  isSessao,
  id,
  onVerResultados,
  onIniciarSessao,
  onParticiparSessao,
}: BotaoStatusProps) => {
  const statusInfo = useMemo(() => {
    return getStatusInfo(status, isSessao, id, {
      onVerResultados,
      onIniciarSessao,
      onParticiparSessao,
    });
  }, [status, isSessao, id, onVerResultados, onIniciarSessao, onParticiparSessao]);

  const { cor, texto, icone, acao, mostrarVerMais } = statusInfo;
  return (
    <div className="mt-6 flex flex-col gap-2">
      <button
        onClick={acao}
        className={`w-full px-4 py-2 text-sm font-semibold rounded-md flex items-center justify-center transition ${cor}`}
      >
        {icone}
        {texto}
      </button>

      <div className="flex justify-between items-center text-sm text-gray-600">
        {mostrarVerMais && id !== undefined && (
          <ModalVisualizarData id={id} isSessao={isSessao} size={isSessao ? 'md' : 'xl'}>
            <span className="underline hover:text-gray-800 cursor-pointer">Ver Mais</span>
          </ModalVisualizarData>
        )}

        {id !== undefined && <span className="text-xs text-gray-500">cod.: {id}</span>}
      </div>
    </div>
  );
};

export default BotaoStatusComponent;

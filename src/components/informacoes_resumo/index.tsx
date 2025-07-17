import { LuAlarmClock, LuCalendarClock } from 'react-icons/lu';

interface InformacaoResumoProps {
  icon?: React.ReactNode;
  titulo: string;
  descricao?: string;
  duracao?: number;
  horarioInicio?: string;
  horarioFim?: string;
  pautaTitulo?: string;
}

const InformacaoResumo = ({
  icon,
  titulo,
  descricao,
  duracao,
  horarioInicio,
  horarioFim,
  pautaTitulo,
}: InformacaoResumoProps) => {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        {icon && (
          <div className="w-8 h-8 bg-indigo-200 text-indigo-900 rounded-full flex items-center justify-center">
            {icon}
          </div>
        )}
        <span className="text-md font-medium text-indigo-900">{titulo}</span>
      </div>

      {pautaTitulo && (
        <div className="flex items-center gap-2 mt-2">
          <LuCalendarClock className="text-black mt-[2px]" />
          <p className="text-sm text-gray-600">
            <span className="font-bold">Pauta:</span> {pautaTitulo}
          </p>
        </div>
      )}

      {descricao && (
        <p className="text-sm sm: text-md break-words text-gray-600 mt-1 ml-6">
          <span className="font-bold">Descrição:</span> {descricao}
        </p>
      )}

      {duracao && (
        <div className="flex items-center gap-2 mt-2">
          <LuAlarmClock className="text-black" />
          <p className="text-sm text-gray-600">
            <span className="font-bold">Duração:</span> {duracao} minutos
          </p>
        </div>
      )}

      {horarioInicio && (
        <div className="flex items-start gap-2 mt-2">
          <LuCalendarClock className="text-black mt-[2px]" />
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-700">Início:</span> {horarioInicio}
            {horarioFim && (
              <>
                {' '}
                -<span className="font-bold text-gray-700"> Fim:</span> {horarioFim}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default InformacaoResumo;

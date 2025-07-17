import { LuAlarmClock, LuCalendarClock } from 'react-icons/lu';
import type { SessaoIniciadaResponseDTO } from '../../../service/interfaces/interfaceSessao';
import ContagemRegressivaComponent from '../contagem_regressiva';

interface CabecalhoSessaoProps {
  data: SessaoIniciadaResponseDTO;
  onExpired: () => void;
}

const CabecalhoSessaoComponent = ({ data, onExpired }: CabecalhoSessaoProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sessão de Votação em Andamento
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded text-blue-900">
            <h3 className="font-bold text-sm mb-1">{data.pauta.titulo}</h3>
            <p className="text-sm">{data.pauta.descricao}</p>
          </div>
        </div>

        <div className="sm:ml-4">
          <ContagemRegressivaComponent
            inicio={data.horarioInicio}
            duracaoEmMinutos={data.duracao}
            onExpired={onExpired}
          />
        </div>
      </div>

      <div className="mt-6 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
        <div className="flex items-start gap-2">
          <LuAlarmClock className="text-black mt-1" />
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-700">Duração:</span> {data.duracao} minutos
          </p>
        </div>

        <div className="flex items-start gap-2">
          <LuCalendarClock className="text-black mt-1" />
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-700">Início:</span> {data.horarioInicio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CabecalhoSessaoComponent;

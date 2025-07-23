import { IoNewspaper } from 'react-icons/io5';
import type { VisualizarPautaProps } from '../../interfaces/components/visualizarPautaProps';
import { handleStatus } from '../../utils/helper/StatusUtils';
import InformacaoResumo from '../informacoes_resumo';
import Loading from '../loading';
import TagsResumo from '../tags/tagsResumo';
import EstatisticasVotos from '../votacao/estatisticas_votos';
import HistoricoVotos from '../votacao/historico_votos';
import { useBuscarPautaPorId } from '../../hooks/pautas/useBuscarPautaPorId';

const VisualizarPauta = ({ id, sessaoDaPauta }: VisualizarPautaProps) => {
  const { pauta, isLoading } = useBuscarPautaPorId(id);

  if (isLoading || !pauta) return <Loading />;

  const { titulo, descricao, status, resultado, votosTotais, votosFavor, votosContra } = pauta;
  const deveMostrarGrafico = status !== 'NAO_VOTADA';

  return (
    <div className="bg-indigo-50 rounded-lg p-4 shadow-sm w-full h-full flex flex-col justify-between relative">
      <InformacaoResumo icon={<IoNewspaper />} titulo={titulo} descricao={descricao} />

      {deveMostrarGrafico && (
        <div className="flex flex-col lg:flex-row gap-10 items-start p-4 mt-5">
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
            <EstatisticasVotos total={votosTotais} sim={votosFavor} nao={votosContra} />
          </div>
          <div className="w-full lg:w-3/4">
            <HistoricoVotos votos={sessaoDaPauta?.votos} isConcluida />
          </div>
        </div>
      )}

      <div className="mt-2 pt-2 flex gap-2 flex-wrap">
        <span className="text-sm font-bold text-gray-700">Tags: </span>
        <TagsResumo status={handleStatus(status)} resultado={resultado} exibirResultado />
      </div>
    </div>
  );
};

export default VisualizarPauta;

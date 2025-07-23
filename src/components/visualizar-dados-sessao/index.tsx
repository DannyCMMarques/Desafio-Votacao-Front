import { LuCalendarClock } from 'react-icons/lu';
import type { VisualizarSessaoProps } from '../../interfaces/components/visualizarSessaoProps';
import InformacaoResumo from '../informacoes_resumo';
import Loading from '../loading';
import TagsResumo from '../tags/tagsResumo';
import EstatisticasVotos from '../votacao/estatisticas_votos';
import HistoricoVotos from '../votacao/historico_votos';
import { useBuscarSessaoPorId } from '../../hooks/sessao/useBuscarSessaoPorId';

const VisualizarSessao = ({ id }: VisualizarSessaoProps) => {
  const { sessao, loading } = useBuscarSessaoPorId(id);

  if (loading || !sessao) return <Loading />;

  const {
    pauta: { titulo: pautaTitulo, descricao },
    duracao,
    horarioInicio,
    horarioFim,
    status,
    pauta: { votosTotais: ptTotais, votosFavor, votosContra },
    votos,
  } = sessao;

  const deveMostrarGrafico = sessao.pauta.status !== 'NAO_VOTADA';

  return (
    <div className="bg-indigo-50 rounded-lg p-4 shadow-sm w-full h-full flex flex-col justify-between relative">
      <InformacaoResumo
        icon={<LuCalendarClock />}
        titulo={`Sessão ${sessao.id}`}
        descricao={descricao}
        duracao={duracao}
        horarioInicio={horarioInicio ?? undefined}
        horarioFim={horarioFim ?? undefined}
        pautaTitulo={pautaTitulo}
      />

      {deveMostrarGrafico && (
        <div className="flex flex-col lg:flex-row gap-10 items-start p-4 mt-5">
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
            <EstatisticasVotos total={ptTotais} sim={votosFavor} nao={votosContra} />
          </div>
          <div className="w-full lg:w-3/4">
            <HistoricoVotos votos={votos} isConcluida />
          </div>
        </div>
      )}

      <div className="mt-2 pt-2 flex gap-2 flex-wrap">
        <span className="text-sm font-bold text-gray-700">Tags: </span>
        <TagsResumo status={status} exibirResultado={false} />
      </div>
    </div>
  );
};

export default VisualizarSessao;

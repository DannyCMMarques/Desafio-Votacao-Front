import { useCallback, useEffect, useState } from 'react';
import { LuCalendarClock } from 'react-icons/lu';
import type { SessaoIniciadaResponseDTO } from '../../service/interfaces/interfaceSessao';
import useSessaoService from '../../service/useSessaoService';
import InformacaoResumo from '../informacoes_resumo';
import Loading from '../loading';
import TagsResumo from '../tags/tagsResumo';
import EstatisticasVotos from '../votacao/estatisticas_votos';
import HistoricoVotos from '../votacao/historico_votos';
import { handleStatus } from '../../utils/helper/StatusUtils';

interface VisualizarSessaoProps {
    id: number;
}

const VisualizarSessao = ({ id }: VisualizarSessaoProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [sessao, setSessao] = useState<SessaoIniciadaResponseDTO>();
    const sessaoService = useSessaoService();

    const fetchSessao = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await sessaoService.getById(id);
            setSessao(data as SessaoIniciadaResponseDTO);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchSessao();
    }, [fetchSessao]);

    if (isLoading || !sessao) return <Loading />;

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
                        <EstatisticasVotos
                            total={ptTotais}
                            sim={votosFavor}
                            nao={votosContra}
                        />
                    </div>
                    <div className="w-full lg:w-3/4">
                        <HistoricoVotos votos={votos} isConcluida />
                    </div>
                </div>
            )}

            <div className="mt-2 pt-2 flex gap-2 flex-wrap">
                <span className="text-sm font-bold text-gray-700">Tags: </span>
                <TagsResumo
                    status={handleStatus(status)}
                    exibirResultado={false}
                />
            </div>
        </div>
    );
};

export default VisualizarSessao;

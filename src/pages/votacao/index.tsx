import { useCallback, useContext, useEffect, useState } from 'react';
import { TbLockFilled } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import ContainerComponent from '../../components/container';
import FormularioUsuario from '../../components/form/form_associado';
import Modal from '../../components/modal';
import BotaoVotoComponent from '../../components/votacao/botao_votacao';
import CabecalhoSessaoComponent from '../../components/votacao/cabecalho_votacao';
import EstatisticasVotos from '../../components/votacao/estatisticas_votos';
import HistoricoVotos from '../../components/votacao/historico_votos';
import { UsuarioContext } from '../../context';
import type { SessaoIniciadaResponseDTO } from '../../service/interfaces/interfaceSessao';
import type { VotoRequestDTO } from '../../service/interfaces/interfaceVotacao';
import useSessaoService from '../../service/useSessaoService';
import Loading from '../../components/loading';

const VotacaoPageView = () => {
  const [sessao, setSessao] = useState<SessaoIniciadaResponseDTO | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sessaoEncerrada, setSessaoEncerrada] = useState(false);
  const sessaoService = useSessaoService();
  const { idUsuario } = useContext(UsuarioContext);

  const { id } = useParams<{ id: string }>();

  const exibirSessao = useCallback(async () => {
    try {
      const dataRecebida: SessaoIniciadaResponseDTO = await sessaoService.getById(Number(id));
      setSessao(dataRecebida);
    } catch (err) {
      console.error('Erro ao buscar item:', err);
    }
  }, [id]);

  const handleVotar = useCallback(
    async (voto: VotoRequestDTO) => {
      try {
        await sessaoService.votarSessao(Number(id), voto);
        exibirSessao();
        toast.success('Voto computado com Sucesso');
      } catch (err) {
        console.error('Erro ao buscar item:', err);
        toast.error(err.response.data.message);
      }
    },
    [id, sessaoService, exibirSessao],
  );

  useEffect(() => {
    exibirSessao();
  }, [exibirSessao]);
  const votar = (voto: boolean) => {
    if (idUsuario == null) {
      setIsOpenModal(true);
    } else {
      const request: VotoRequestDTO = {
        voto: voto,
        associado: idUsuario,
      };
      handleVotar(request);
    }
  };

  if (!sessao) return <Loading />;
  const handleSessaoEncerrada = () => {
    setSessaoEncerrada(true);
  };

  const handleFecharModal = () => {
    setIsOpenModal(false);
  };
  return (
    <div className="sm:px-0 lg:px-8 py-1 min-h-screen">
      <ToastContainer position="top-right" autoClose={5000} theme="colored" transition={Bounce} />

      {isOpenModal && (
        <Modal onFechar={handleFecharModal} tamanho="md">
          <FormularioUsuario
            handleClose={handleFecharModal}
            onSucesso={() => {
              handleFecharModal();
            }}
          />
        </Modal>
      )}
      <div className="relative">
        {sessaoEncerrada && (
          <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-xs rounded-lg">
            <p className="text-xl font-bold text-red-700">
              <TbLockFilled size={40} />
            </p>
            <p className="text-xl font-bold text-red-700 mr-2">Sessão Encerrada</p>
          </div>
        )}

        <ContainerComponent cor="bg-transparent">
          <CabecalhoSessaoComponent data={sessao} onExpired={handleSessaoEncerrada} />

          <div className="flex flex-col lg:flex-row justify-between gap-6 mt-6">
            <div className="flex flex-col gap-6 flex-1">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-semibold mb-4 text-gray-800">Seu Voto</h4>
                <BotaoVotoComponent onVotar={votar} />
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-semibold mb-4 text-gray-800">Estatísticas</h4>
                <EstatisticasVotos
                  sim={sessao.pauta.votosFavor}
                  nao={sessao.pauta.votosContra}
                  total={sessao.pauta.votosTotais}
                />
              </div>
            </div>

            <div className="lg:w-[65%] sm:w-full   ">
              <HistoricoVotos votos={sessao.votos} />
            </div>
          </div>
        </ContainerComponent>
      </div>
    </div>
  );
};

export default VotacaoPageView;

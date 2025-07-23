import { useContext } from 'react';
import { TbLockFilled } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import ContainerComponent from '../../components/container';
import FormularioUsuario from '../../components/form/form_associado';
import Loading from '../../components/loading';
import Modal from '../../components/modal';
import BotaoVotoComponent from '../../components/votacao/botao_votacao';
import CabecalhoSessaoComponent from '../../components/votacao/cabecalho_votacao';
import EstatisticasVotos from '../../components/votacao/estatisticas_votos';
import HistoricoVotos from '../../components/votacao/historico_votos';
import { UsuarioContext } from '../../context';
import { useBuscarSessaoPorId } from '../../hooks/sessao/useBuscarSessaoPorId';
import { useSessaoEncerrada } from '../../hooks/sessao/useSessaoEncerrada';
import { useModal } from '../../hooks/useModal';
import { useVotacao } from '../../hooks/useVotacao';
import type { VotoRequestDTO } from '../../interfaces/interfaceVotacao';

const VotacaoPageView = () => {
  const { id: idParam } = useParams<{ id: string }>();

  const idSessao = Number(idParam);

  const { idUsuario } = useContext(UsuarioContext);

  const { sessao, loading, refresh } = useBuscarSessaoPorId(idSessao);

  const { isOpenModal, handleAbrirModal, handleFecharModal } = useModal(false);

  const { sessaoEncerrada, handleSessaoEncerrada } = useSessaoEncerrada(false);

  const { votar } = useVotacao(refresh);

  if (loading) {
    return <Loading />;
  }

  const handleVoto = (valor: boolean) => {
    if (!idUsuario) {
      handleAbrirModal();
      return;
    }
    const payload: VotoRequestDTO = { associado: idUsuario, voto: valor };
    votar(idSessao, payload);
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
                <BotaoVotoComponent onVotar={handleVoto} />
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-semibold mb-4 text-gray-800">Estatísticas</h4>
                <EstatisticasVotos
                  sim={sessao!.pauta.votosFavor}
                  nao={sessao!.pauta.votosContra}
                  total={sessao!.pauta.votosTotais}
                />
              </div>
            </div>

            <div className="lg:w-[65%] sm:w-full   ">
              <HistoricoVotos votos={sessao!.votos} />
            </div>
          </div>
        </ContainerComponent>
      </div>
    </div>
  );
};

export default VotacaoPageView;

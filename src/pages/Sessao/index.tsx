import { FaVoteYea } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Bounce, ToastContainer } from 'react-toastify';
import Cards from '../../components/cards/Cards';
import ContainerComponent from '../../components/container';
import FormularioSessao from '../../components/form/form_sessao';
import Loading from '../../components/loading';
import Modal from '../../components/modal';
import Paginador from '../../components/paginador';
import VisualizarSessao from '../../components/visualizar-dados-sessao';
import { useSessaoPaginacao } from '../../hooks/sessao/useSessaoPaginacao';
import { useIniciarSessao } from '../../hooks/sessao/useIniciarSessao';
import { useDeletarSessao } from '../../hooks/sessao/useDeletarSessao';
import { useModalCard } from '../../hooks/useModalCard';

const SessaoPageView = () => {
  const { pagina, setPagina, totalPages, totalItens, sessoes, isLoading, exibirSessoes } =
    useSessaoPaginacao();
  const { handleIniciarSessao, handleNavegarSessao } = useIniciarSessao({ exibirSessoes, pagina });

  const { modal, abrirFormulario, abrirResultado, fecharModal } = useModalCard();

  const { onDelete } = useDeletarSessao({ exibirSessoes, pagina });

  return (
    <main className=" sm:px-0 lg:px-8 py-8 min-h-screen">
      <ToastContainer position="top-right" autoClose={5000} theme="colored" transition={Bounce} />

      {modal?.tipo === 'resultado' && (
        <Modal onFechar={fecharModal} tamanho="lg">
          <VisualizarSessao id={modal.id!} />
        </Modal>
      )}
      {modal?.tipo === 'formulario' && (
        <Modal onFechar={fecharModal} tamanho="md">
          <FormularioSessao
            id={modal.id}
            handleClose={fecharModal}
            onSucesso={() => {
              exibirSessoes(pagina);
              fecharModal();
            }}
          />
        </Modal>
      )}

      <section className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sessões de Votação</h1>
          <p className="text-sm text-gray-500">Gerencie as sessões vinculadas às pautas</p>
        </div>

        <button
          onClick={() => abrirFormulario()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <IoAddCircleOutline className="text-lg" />
          Nova Sessão
        </button>
      </section>

      <ContainerComponent>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessoes.map((sessao) => (
              <Cards
                key={sessao.id}
                pautaTitulo={sessao.pauta.titulo}
                id={sessao.id}
                icon={<FaVoteYea />}
                status={sessao.status}
                duracao={sessao.duracao}
                horarioInicio={sessao.horarioInicio}
                horarioFim={sessao.horarioFim}
                isSessao={true}
                onEditar={() => abrirFormulario(sessao.id)}
                onVerResultados={() => abrirResultado(sessao.id)}
                onExcluir={onDelete}
                onIniciarSessao={() => handleIniciarSessao(sessao.id)}
                onParticiparSessao={() => handleNavegarSessao(sessao.id)}
              />
            ))}
          </div>
        )}
      </ContainerComponent>

      <div className="mt-10">
        <Paginador
          paginaAtual={pagina}
          totalPaginas={totalPages}
          totalItens={totalItens}
          aoMudarPagina={setPagina}
        />
      </div>
    </main>
  );
};

export default SessaoPageView;

import { IoAddCircleOutline, IoNewspaper } from 'react-icons/io5';
import { Bounce, ToastContainer } from 'react-toastify';
import Cards from '../../components/cards/Cards';
import ContainerComponent from '../../components/container';
import FormularioPauta from '../../components/form/form_pauta';
import Loading from '../../components/loading';
import Modal from '../../components/modal';
import Paginador from '../../components/paginador';
import VisualizarPauta from '../../components/visualizar-dados-pauta';
import { useDeletarPautas } from '../../hooks/pautas/useDeletarPautas';
import { useExibirPautasPaginadas } from '../../hooks/pautas/useExibirPautas';
import { useObterSessaoPorPauta } from '../../hooks/sessao/useObterSessaoPorPauta';
import { handleResumo } from '../../utils/helper/handleResumo';
import { useSessaoNavigation } from '../../hooks/sessao/useSessaoNavigation';
import { useModalCard } from '../../hooks/useModalCard';

const PautasPageView = () => {
  const { navegarParaSessao } = useSessaoNavigation();

  const { modal, abrirFormulario, abrirResultado, fecharModal } = useModalCard();

  const { exibirPautas, setPagina, totalPages, totalItens, pautas, isLoading, pagina } =
    useExibirPautasPaginadas();

  const { onDelete } = useDeletarPautas({ exibirPautas, pagina });

  const { obterIdSessaoPorPauta, sessaoDaPauta } = useObterSessaoPorPauta();

  return (
    <main className="sm:px-0 lg:px-8 py-8 min-h-screen">
      <ToastContainer position="top-right" autoClose={5000} theme="colored" transition={Bounce} />

      {modal?.tipo === 'resultado' && modal.id != null && sessaoDaPauta && (
        <Modal onFechar={fecharModal} tamanho="xl">
          <VisualizarPauta id={modal.id} sessaoDaPauta={sessaoDaPauta} />
        </Modal>
      )}

      {modal?.tipo === 'formulario' && (
        <Modal onFechar={fecharModal} tamanho="md">
          <FormularioPauta
            id={modal.id}
            handleClose={fecharModal}
            onSucesso={() => {
              exibirPautas(pagina);
              fecharModal();
            }}
          />
        </Modal>
      )}

      <section className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pautas de Votação</h1>
          <p className="text-sm text-gray-500">Gerencie as pautas do sistema de votação</p>
        </div>

        <button
          onClick={() => abrirFormulario()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <IoAddCircleOutline className="text-lg" />
          Nova Pauta
        </button>
      </section>

      <ContainerComponent>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pautas.map((pauta) => (
              <Cards
                key={pauta.id}
                pautaTitulo={pauta.titulo}
                descricao={handleResumo(pauta.descricao)}
                icon={<IoNewspaper />}
                status={pauta.status}
                id={pauta.id}
                onEditar={() => abrirFormulario(pauta.id)}
                onExcluir={onDelete}
                onVerResultados={() => {
                  obterIdSessaoPorPauta(pauta.id).then(() => abrirResultado(pauta.id));
                }}
                onParticiparSessao={() => navegarParaSessao(pauta.id)}
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

export default PautasPageView;

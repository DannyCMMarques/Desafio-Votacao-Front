import { useCallback, useEffect, useState } from 'react';
import { FaVoteYea } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Cards from '../../components/cards/Cards';
import ContainerComponent from '../../components/container';
import FormularioSessao from '../../components/form/form_sessao';
import Loading from '../../components/loading';
import Modal from '../../components/modal';
import Paginador from '../../components/paginador';
import VisualizarSessao from '../../components/visualizar-dados-sessao';
import type { SessaoPage, SessaoResponseDTO } from '../../interfaces/interfaces/interfaceSessao';
import useSessaoService from '../../service/useSessaoService';

type ModalState = {
  tipo: 'formulario' | 'resultado' | null;
  id?: number | null;
};

const SessaoPageView = () => {
  const sessaoService = useSessaoService();
  const navigate = useNavigate();
  const [sessoes, setSessoes] = useState<SessaoResponseDTO[]>([]);
  const [pagina, setPagina] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({ tipo: null, id: null });
  const [totalItens, setTotalItens] = useState<number>(0);
  const size = 10;

  const exibirSessoes = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      try {
        const response: SessaoPage = await sessaoService.listarSessao(page, size);
        setSessoes(response.content);
        setTotalPages(response.totalPages);
        setTotalItens(response?.totalElements);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [sessaoService],
  );

  useEffect(() => {
    exibirSessoes(pagina);
  }, [pagina]);

  const abrirModal = (tipo: 'formulario' | 'resultado', id?: number) => {
    setModal({ tipo, id: id ?? null });
  };

  const fecharModal = () => {
    setModal({ tipo: null, id: null });
  };

  const onDelete = async (id: number) => {
    try {
      await sessaoService.deletarSessao(id);
      toast.success('Sessão excluída com sucesso');
      exibirSessoes(pagina);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao deletar sessão');
    }
  };

  const iniciarSessao = async (id: number) => {
    try {
      await sessaoService.iniciarSessao(id);
      exibirSessoes(pagina);
    } catch (err) {
      console.error('erro ao iniciar sessao', err);
    }
  };
  const handleNavegarSessao = (id: number) => {
    navigate(`/sessao/${id}`);
  };
  const handleIniciarSessao = async (id: number) => {
    try {
      await iniciarSessao(id);
      handleNavegarSessao(id);
    } catch (err) {
      console.error('Erro ao iniciar sessão:', err);
    }
  };

  return (
    <main className=" sm:px-0 lg:px-8 py-8 min-h-screen">
      <ToastContainer position="top-right" autoClose={5000} theme="colored" transition={Bounce} />

      {modal.tipo === 'resultado' && modal.id != null && (
        <Modal onFechar={fecharModal} tamanho="lg">
          <VisualizarSessao id={modal.id} />
        </Modal>
      )}

      {modal.tipo === 'formulario' && (
        <Modal onFechar={fecharModal} tamanho="md">
          <FormularioSessao
            id={modal.id ?? undefined}
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
          onClick={() => abrirModal('formulario')}
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
                onEditar={(id) => abrirModal('formulario', id)}
                onExcluir={onDelete}
                onVerResultados={(id) => abrirModal('resultado', id)}
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

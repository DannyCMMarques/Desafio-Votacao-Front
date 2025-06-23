import { useCallback, useEffect, useState } from "react";
import { IoAddCircleOutline, IoNewspaper } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Cards from "../../components/cards/Cards";
import ContainerComponent from "../../components/container";
import FormularioPauta from "../../components/form/form_pauta";
import Modal from "../../components/modal";
import Paginador from "../../components/paginador";
import type { PautaPage, PautaResponseDTO } from "../../service/interfaces/interfacePauta";
import type { SessaoIniciadaResponseDTO } from "../../service/interfaces/interfaceSessao";
import usePautaService from "../../service/usePautaService";
import useSessaoService from "../../service/useSessaoService";
import { handleStatus } from "../../utils/helper/StatusUtils";
import Loading from "../../components/loading";
import VisualizarPauta from "../../components/visualizar-dados-pauta";

type ModalState = {
    tipo: "formulario" | "resultado" | null;
    id?: number | null;
};

const PautasPageView = () => {
    const pautaService = usePautaService();
    const sessaoService = useSessaoService();
    const navigate = useNavigate();


    const [pautas, setPautas] = useState<PautaResponseDTO[]>([]);
    const [pagina, setPagina] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState<ModalState>({ tipo: null, id: null });
    const [sessaoDaPauta, setSessaoDaPauta] =
        useState<SessaoIniciadaResponseDTO | undefined>();
    const [totalItens, setTotalItens] = useState<number>(0);

    const size = 10;


    const obterIdSessao = async (idPauta: number): Promise<number | undefined> => {
        try {
            const response = await sessaoService.listarSessao(1, 10, "id", "desc", idPauta);
            const sessao = response.content?.[0] as SessaoIniciadaResponseDTO;
            setSessaoDaPauta(sessao);
            if (sessao?.id !== undefined) {
                return sessao.id;
            }
        } catch (err) {
            console.error("Erro ao obter sessão", err);
        }
    };


    const exibirPautas = useCallback(async (page = 1) => {
        setIsLoading(true);
        try {
            const response: PautaPage = await pautaService.listarPauta(page, size);
            setPautas(response?.content);
            setTotalItens(response?.totalElements);
            setTotalPages(response.totalPages);
        } catch (err) {
            console.error(err, " erro ao buscar pauta")
        } finally {
            setIsLoading(false);
        }
    }, [pautaService]);

    useEffect(() => {
        exibirPautas(pagina);
    }, [pagina, totalItens]);

    const abrirModal = async (tipo: "formulario" | "resultado", id?: number) => {
        if (tipo === "resultado" && id !== undefined) {
            await obterIdSessao(id);
        }

        setModal({ tipo, id: id ?? null });
    };

    const fecharModal = () => {
        setModal({ tipo: null, id: null });
    };

    const handleResumo = (texto: string) => {
        const limite = 230;
        return texto.length <= limite ? texto : texto.slice(0, limite - 3).trim() + "...";
    };

    const onDelete = async (id: number) => {
        try {
            await pautaService.deletarPauta(id);
            toast.success("Pauta excluída com sucesso");
            exibirPautas(pagina);
        } catch (err: unknown) {
            toast.error(err?.response.data.message)
        }
    };

    const handleNavigationSessao = async (idPauta: number) => {
        const id = await obterIdSessao(idPauta);
        if (id !== undefined) {
            navigate(`/sessao/${id}`);
        } else {
            toast.error("Sessão não encontrada");
        }
    };



    return (
        <main className="sm:px-0 lg:px-8 py-8 min-h-screen">
            <ToastContainer position="top-right" autoClose={5000} theme="colored" transition={Bounce} />

            {modal.tipo === "resultado" && modal.id != null && sessaoDaPauta !== undefined && (
                <Modal onFechar={fecharModal} tamanho="xl">
                    <VisualizarPauta id={modal.id} sessaoDaPauta={sessaoDaPauta} />
                </Modal>
            )}

            {modal.tipo === "formulario" && (
                <Modal onFechar={fecharModal} tamanho="md">
                    <FormularioPauta
                        id={modal.id ?? undefined}
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
                    onClick={() => abrirModal("formulario")}
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
                                status={handleStatus(pauta.status)}
                                id={pauta.id}
                                onEditar={(id) => abrirModal("formulario", id)}
                                onExcluir={onDelete}
                                onVerResultados={(id) => abrirModal("resultado", id)}
                                onParticiparSessao={() => handleNavigationSessao(pauta.id)}
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

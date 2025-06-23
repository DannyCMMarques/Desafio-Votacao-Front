import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VisualizarSessao from ".";
import { mockSessaoIniciadaPage } from "../../utils/mock/SessaoMock";

const getByIdMock = vi.fn();
vi.mock("../../service/useSessaoService", () => ({
    default: () => ({ getById: getByIdMock }),
}));

vi.mock("../informacoes_resumo", () => ({
    __esModule: true,
    default: ({ titulo }: { titulo: string }) => (
        <div data-testid="info-resumo">{titulo}</div>
    ),
}));

vi.mock("../loading", () => ({
    __esModule: true,
    default: () => <div>Carregando sessão</div>,
}));

vi.mock("../tags/tagsResumo", () => ({
    __esModule: true,
    default: () => <div data-testid="tags-resumo" />,
}));

vi.mock("../votacao/estatisticas_votos", () => ({
    __esModule: true,
    default: () => <div data-testid="estatisticas-votos" />,
}));

vi.mock("../votacao/historico_votos", () => ({
    __esModule: true,
    default: () => <div data-testid="historico-votos" />,
}));

describe("<VisualizarSessao />", () => {
    beforeEach(() => {
        const sessao = mockSessaoIniciadaPage.content[0];
        getByIdMock.mockResolvedValue(sessao);
    });

    it("mostra loading inicialmente", () => {
        render(<VisualizarSessao id={mockSessaoIniciadaPage.content[0].id} />);
        expect(screen.getByText(/Carregando sessão/i)).toBeInTheDocument();
    });

    it("exibe as informações da sessão após carregar", async () => {
        render(<VisualizarSessao id={mockSessaoIniciadaPage.content[0].id} />);
        await waitFor(() =>
            expect(screen.getByTestId("info-resumo")).toHaveTextContent(
                `Sessão ${mockSessaoIniciadaPage.content[0].id}`
            )
        );
        expect(screen.getByTestId("estatisticas-votos")).toBeInTheDocument();
        expect(screen.getByTestId("historico-votos")).toBeInTheDocument();
        expect(screen.getByTestId("tags-resumo")).toBeInTheDocument();
    });
});

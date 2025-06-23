import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import SessaoPageView from '.';
import { mockSessaoPage } from '../../utils/mock/SessaoMock';

const listarSessaoMock = vi.fn();
const deletarSessaoMock = vi.fn();
const iniciarSessaoMock = vi.fn();

vi.mock('../../service/useSessaoService', () => ({
    default: () => ({
        listarSessao: listarSessaoMock,
        deletarSessao: deletarSessaoMock,
        iniciarSessao: iniciarSessaoMock,
    }),
}));

vi.mock('react-router-dom', async (orig) => {
    const mod = await orig();
    return { ...(mod as object), useNavigate: () => vi.fn() };
});

vi.mock('react-toastify', () => ({
    toast: { success: vi.fn(), error: vi.fn() },
    ToastContainer: ({ children }: { children?: React.ReactNode }) => (
        <div data-testid="toast">{children}</div>
    ),
    Bounce: {},
}));

vi.mock('../../components/container', () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="container">{children}</div>
    ),
}));

vi.mock('../../components/modal', () => ({
    default: ({
        children,
        onFechar,
    }: {
        children: React.ReactNode;
        onFechar: () => void;
    }) => (
        <div data-testid="modal" onClick={onFechar}>
            {children}
        </div>
    ),
}));

vi.mock('../../components/form/form_sessao', () => ({
    default: () => <div data-testid="formulario-sessao" />,
}));

vi.mock('../../components/visualizar-dados-sessao', () => ({
    default: () => <div data-testid="visualizar-data" />,
}));

vi.mock('../../components/paginador', () => ({
    default: () => <div data-testid="paginador" />,
}));

vi.mock('../../components/cards/Cards', () => ({
    default: ({
        pautaTitulo,
        id,
        onVerResultados,
    }: {
        pautaTitulo: string;
        id: number;
        onVerResultados: (id: number) => void;
    }) => (
        <button
            data-testid={`card-${id}`}
            onClick={() => onVerResultados(id)}
        >
            {pautaTitulo}
        </button>
    ),
}));

vi.mock('../../components/loading', () => ({
    default: () => <div>Carregando sessões</div>,
}));

describe('<SessaoPageView />', () => {
    beforeEach(() => {
        listarSessaoMock.mockResolvedValue(mockSessaoPage);
    });

    it('renderiza sessões após o loading', async () => {
        render(<SessaoPageView />);
        expect(screen.getByText(/Carregando sessões/i)).toBeInTheDocument();
        await waitFor(() =>
            expect(screen.getByTestId(`card-${mockSessaoPage.content[0].id}`)).toBeInTheDocument()
        );
    });

    it('abre modal de “Nova Sessão” ao clicar no botão', async () => {
        render(<SessaoPageView />);
        await waitFor(() => screen.getByTestId(`card-${mockSessaoPage.content[0].id}`));
        fireEvent.click(screen.getByRole('button', { name: /nova sessão/i }));
        expect(screen.getByTestId('formulario-sessao')).toBeInTheDocument();
    });

    it('abre modal de resultados ao clicar em um card', async () => {
        render(<SessaoPageView />);
        const card = await screen.findByTestId(`card-${mockSessaoPage.content[0].id}`);
        fireEvent.click(card);
        await waitFor(() =>
            expect(screen.getByTestId('visualizar-data')).toBeInTheDocument()
        );
    });
});

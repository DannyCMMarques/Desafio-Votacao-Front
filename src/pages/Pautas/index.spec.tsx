import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import PautasPageView from '.';

const listarPautaMock = vi.fn();
const deletarPautaMock = vi.fn();
vi.mock('../../service/usePautaService', () => ({
  default: () => ({
    listarPauta: listarPautaMock,
    deletarPauta: deletarPautaMock,
  }),
}));

const listarSessaoMock = vi.fn();
vi.mock('../../service/useSessaoService', () => ({
  default: () => ({
    listarSessao: listarSessaoMock,
  }),
}));

vi.mock('react-router-dom', async (orig) => {
  const mod = await orig();
  return {
    ...(mod as object),
    useNavigate: () => vi.fn(),
  };
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
  default: ({ children, onFechar }: { children: React.ReactNode; onFechar: () => void }) => (
    <div data-testid="modal" onClick={onFechar}>
      {children}
    </div>
  ),
}));

vi.mock('../../components/form/form_pauta', () => ({
  default: () => <div data-testid="formulario-pauta" />,
}));

vi.mock('../../components/visualizar-dados-pauta', () => ({
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
    <button data-testid={`card-${id}`} onClick={() => onVerResultados(id)}>
      {pautaTitulo}
    </button>
  ),
}));

vi.mock('../../components/loading', () => ({
  default: () => <div>Carregando pautas</div>,
}));

const mockPautaPage = {
  content: [
    {
      id: 1,
      titulo: 'Biblioteca 24 h',
      descricao: 'Descrição extensa da pauta',
      status: 'NAO_VOTADA',
    },
  ],
  totalElements: 1,
  totalPages: 1,
};

const mockSessaoPage = {
  content: [
    {
      id: 10,
      pauta: mockPautaPage.content[0],
      duracao: 30,
      status: 'FINALIZADA',
      horarioInicio: null,
      horarioFim: null,
      votos: [],
    },
  ],
};

describe('<PautasPageView />', () => {
  beforeEach(() => {
    listarPautaMock.mockResolvedValue(mockPautaPage);
    listarSessaoMock.mockResolvedValue(mockSessaoPage);
  });

  it('exibe pautas após o carregamento', async () => {
    render(<PautasPageView />);
    expect(screen.getByText(/Carregando pautas/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('card-1')).toBeInTheDocument());
  });

  it('abre modal de “Nova Pauta” ao clicar no botão', async () => {
    render(<PautasPageView />);
    await waitFor(() => screen.getByTestId('card-1'));
    fireEvent.click(screen.getByRole('button', { name: /nova pauta/i }));
    expect(screen.getByTestId('formulario-pauta')).toBeInTheDocument();
  });

  it('abre modal de resultados ao clicar em um card', async () => {
    render(<PautasPageView />);
    const card = await screen.findByTestId('card-1');
    fireEvent.click(card);
    await waitFor(() => expect(screen.getByTestId('visualizar-data')).toBeInTheDocument());
  });
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const getByIdMock = vi.fn();
const votarSessaoMock = vi.fn();

vi.mock('../../service/useSessaoService', () => ({
  default: () => ({
    getById: getByIdMock,
    votarSessao: votarSessaoMock,
  }),
}));

vi.mock('react-router-dom', async (orig) => {
  const mod = await orig();
  return {
    ...mod,
    useParams: () => ({ id: '5' }),
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

vi.mock('react-spinners', () => ({
  BeatLoader: () => <div data-testid="loader" />,
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

vi.mock('../../components/form/form_associado', () => ({
  default: () => <div data-testid="form-associado" />,
}));

vi.mock('../../components/votacao/cabecalho_votacao', () => ({
  default: () => <div data-testid="cabecalho-sessao" />,
}));

vi.mock('../../components/votacao/estatisticas_votos', () => ({
  default: () => <div data-testid="estatisticas" />,
}));

vi.mock('../../components/votacao/historico_votos', () => ({
  default: () => <div data-testid="historico" />,
}));

vi.mock('../../components/votacao/botao_votacao', () => ({
  default: ({ onVotar }: { onVotar: (v: boolean) => void }) => (
    <div>
      <button data-testid="btn-sim" onClick={() => onVotar(true)}>
        SIM
      </button>
      <button data-testid="btn-nao" onClick={() => onVotar(false)}>
        NAO
      </button>
    </div>
  ),
}));

import VotacaoPageView from '.';
import { UsuarioContext } from '../../context';

const mockSessao = {
  id: 5,
  pauta: { titulo: 'Biblioteca 24 h', votosFavor: 10, votosContra: 2, votosTotais: 12 },
  duracao: 30,
  status: 'EM_ANDAMENTO',
  horarioInicio: '2025-06-22T10:00:00Z',
  horarioFim: null,
  votos: [],
};

const renderWithCtx = (idUsuario: number | null) =>
  render(
    <UsuarioContext.Provider value={{ idUsuario, limpar: () => {} } as any}>
      <VotacaoPageView />
    </UsuarioContext.Provider>,
  );

describe('<VotacaoPageView />', () => {
  beforeEach(() => {
    getByIdMock.mockResolvedValue(mockSessao);
    votarSessaoMock.mockResolvedValue({});
  });

  it('mostra loader e, depois, conteúdo da sessão', async () => {
    renderWithCtx(null);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/Seu Voto/i)).toBeInTheDocument());
  });

  it('abre modal de cadastro quando usuário não logado vota', async () => {
    renderWithCtx(null);
    await waitFor(() => screen.getByText(/Seu Voto/i));

    fireEvent.click(screen.getByTestId('btn-sim'));

    expect(await screen.findByTestId('form-associado')).toBeInTheDocument();
  });

  it('chama votarSessao quando usuário logado vota', async () => {
    renderWithCtx(101);
    await waitFor(() => screen.getByText(/Seu Voto/i));

    fireEvent.click(screen.getByTestId('btn-sim'));

    await waitFor(() =>
      expect(votarSessaoMock).toHaveBeenCalledWith(5, {
        voto: true,
        associado: 101,
      }),
    );
  });
});

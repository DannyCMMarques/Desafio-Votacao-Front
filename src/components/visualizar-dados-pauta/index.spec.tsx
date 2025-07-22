import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import VisualizarPauta from '.';
import type { SessaoIniciadaResponseDTO } from '../../interfaces/interfaces/interfaceSessao';
import { mockPautaResultados } from '../../utils/mock/PautaMock';
import { mockVotos } from '../../utils/mock/VotoMock';

const getByIdMock = vi.fn();
vi.mock('../../service/usePautaService', () => ({
  default: () => ({ getById: getByIdMock }),
}));

vi.mock('../informacoes_resumo', () => ({
  __esModule: true,
  default: ({ titulo }: { titulo: string }) => <div data-testid="info-resumo">{titulo}</div>,
}));

vi.mock('../loading', () => ({
  __esModule: true,
  default: () => <div>Carregando pauta</div>,
}));

vi.mock('../tags/tagsResumo', () => ({
  __esModule: true,
  default: () => <div data-testid="tags-resumo" />,
}));

vi.mock('../votacao/estatisticas_votos', () => ({
  __esModule: true,
  default: () => <div data-testid="estatisticas-votos" />,
}));

vi.mock('../votacao/historico_votos', () => ({
  __esModule: true,
  default: () => <div data-testid="historico-votos" />,
}));

describe('<VisualizarPauta />', () => {
  beforeEach(() => {
    const pauta = mockPautaResultados[0];
    getByIdMock.mockResolvedValue({
      ...pauta,
      votosTotais: mockVotos.length,
      votosFavor: mockVotos.filter((v) => v.voto === 'SIM').length,
      votosContra: mockVotos.filter((v) => v.voto === 'NAO').length,
    });
  });

  it('mostra loading inicialmente', () => {
    render(<VisualizarPauta id={mockPautaResultados[0].id} />);
    expect(screen.getByText(/Carregando pauta/i)).toBeInTheDocument();
  });

  it('exibe as informações da pauta após carregar', async () => {
    render(
      <VisualizarPauta
        id={mockPautaResultados[0].id}
        sessaoDaPauta={{ votos: mockVotos } as SessaoIniciadaResponseDTO}
      />,
    );
    await waitFor(() =>
      expect(screen.getByTestId('info-resumo')).toHaveTextContent(mockPautaResultados[0].titulo),
    );
    expect(screen.getByTestId('estatisticas-votos')).toBeInTheDocument();
    expect(screen.getByTestId('historico-votos')).toBeInTheDocument();
    expect(screen.getByTestId('tags-resumo')).toBeInTheDocument();
  });
});

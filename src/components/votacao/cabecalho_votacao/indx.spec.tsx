import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { CabecalhoSessaoProps } from '../../../interfaces/components/votacao/cabecalhoVotaçãoProps';
import CabecalhoSessaoComponent from '.';

vi.mock('../contagem_regressiva', () => ({
  __esModule: true,
  default: ({ inicio, duracaoEmMinutos, onExpired }) => (
    <div data-testid="mock-countdown">
      <span>{`início:${inicio}`}</span>
      <span>{`duração:${duracaoEmMinutos}`}</span>
      <button onClick={onExpired}>trigger-expired</button>
    </div>
  ),
}));

describe('<CabecalhoSessaoComponent />', () => {
  const mockOnExpired = vi.fn();
  const sampleData: CabecalhoSessaoProps['data'] = {
    pauta: {
      id: 10,
      titulo: 'Título da Pauta',
      descricao: 'Descrição da pauta para teste',
      status: 'EM_ANDAMENTO',
      votosFavor: 0,
      votosContra: 0,
      votosTotais: 0,
      resultado: 'PENDENTE',
    },
    duracao: 30,
    horarioInicio: '2025-07-23T14:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza título fixo e bloco de pauta', () => {
    render(<CabecalhoSessaoComponent data={sampleData} onExpired={mockOnExpired} />);

    expect(
      screen.getByRole('heading', { name: /Sessão de Votação em Andamento/i }),
    ).toBeInTheDocument();

    expect(screen.getByText('Título da Pauta')).toBeInTheDocument();
    expect(screen.getByText('Descrição da pauta para teste')).toBeInTheDocument();
  });

  it('renderiza ContagemRegressivaComponent com props corretas e aciona onExpired', () => {
    render(<CabecalhoSessaoComponent data={sampleData} onExpired={mockOnExpired} />);

    expect(screen.getByText(`início:${sampleData.horarioInicio}`)).toBeInTheDocument();
    expect(screen.getByText(`duração:${sampleData.duracao}`)).toBeInTheDocument();

    fireEvent.click(screen.getByText('trigger-expired'));
    expect(mockOnExpired).toHaveBeenCalled();
  });

  it('exibe duração e horário de início no rodapé', () => {
    render(<CabecalhoSessaoComponent data={sampleData} onExpired={mockOnExpired} />);

    expect(screen.getByText(/Duração:/)).toBeInTheDocument();
    expect(screen.getByText(`${sampleData.duracao} minutos`)).toBeInTheDocument();

    expect(screen.getByText(/Início:/)).toBeInTheDocument();
    expect(screen.getByText(sampleData.horarioInicio)).toBeInTheDocument();
  });
});

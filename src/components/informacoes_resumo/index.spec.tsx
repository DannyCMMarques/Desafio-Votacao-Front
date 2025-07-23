import { render, screen } from '@testing-library/react';
import InformacaoResumo from '.';

describe('<InformacaoResumo />', () => {
  const baseProps = {
    icon: <span data-testid="custom-icon" />,
    titulo: 'Título Exemplo',
  };

  it('renderiza título e ícone', () => {
    render(<InformacaoResumo {...baseProps} />);
    expect(screen.getByText('Título Exemplo')).toBeInTheDocument();
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('não mostra bloco de pauta quando pautaTitulo ausente', () => {
    render(<InformacaoResumo {...baseProps} />);
    expect(screen.queryByText(/Pauta:/)).toBeNull();
  });

  it('mostra bloco de pauta quando pautaTitulo definido', () => {
    render(<InformacaoResumo {...baseProps} pautaTitulo="Reunião Mensal" />);
    expect(screen.getByText(/Pauta:/)).toBeInTheDocument();
    expect(screen.getByText('Reunião Mensal')).toBeInTheDocument();
  });

  it('não mostra descrição quando descricao ausente', () => {
    render(<InformacaoResumo {...baseProps} />);
    expect(screen.queryByText(/Descrição:/)).toBeNull();
  });

  it('mostra descrição quando descricao definida', () => {
    render(<InformacaoResumo {...baseProps} descricao="Detalhes da pauta" />);
    expect(screen.getByText(/Descrição:/)).toBeInTheDocument();
    expect(screen.getByText('Detalhes da pauta')).toBeInTheDocument();
  });

  it('não mostra duração quando duracao ausente', () => {
    render(<InformacaoResumo {...baseProps} />);
    expect(screen.queryByText(/Duração:/)).toBeNull();
  });

  it('mostra duração quando duracao definida', () => {
    render(<InformacaoResumo {...baseProps} duracao={45} />);
    expect(screen.getByText(/Duração:/)).toBeInTheDocument();
    expect(screen.getByText(/45 minutos/)).toBeInTheDocument();
  });

  it('não mostra horário quando horarioInicio ausente', () => {
    render(<InformacaoResumo {...baseProps} />);
    expect(screen.queryByText(/Início:/)).toBeNull();
  });
});

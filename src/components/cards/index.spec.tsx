import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Cards from './Cards';

vi.mock('../tags/tagsResumo', () => ({
  default: ({ status, resultado, exibirResultado }: any) => (
    <div data-testid="tags">
      {status}-{resultado}-{String(exibirResultado)}
    </div>
  ),
}));
vi.mock('../informacoes_resumo', () => ({
  default: ({ icon, titulo, descricao }: any) => (
    <div data-testid="info">
      {titulo}: {descricao}
    </div>
  ),
}));
vi.mock('../buttons', () => ({
  default: ({ onVerResultados, onIniciarSessao, onParticiparSessao }: any) => (
    <div>
      <button data-testid="btn-results" onClick={() => onVerResultados?.(42)}>
        R
      </button>
      <button data-testid="btn-start" onClick={() => onIniciarSessao?.(43)}>
        S
      </button>
      <button data-testid="btn-join" onClick={() => onParticiparSessao?.(44)}>
        J
      </button>
    </div>
  ),
}));

describe('<Cards />', () => {
  const baseProps = {
    icon: <span>Ícone</span>,
    descricao: 'Descrição',
    status: 'NÃO VOTADA',
    resultado: 'APROVADO',
    horarioInicio: '10:00',
    horarioFim: '11:00',
    duracao: 60,
    isSessao: false,
    pautaTitulo: 'Título da Pauta',
    id: 5,
    onEditar: vi.fn(),
    onExcluir: vi.fn(),
    onVerResultados: vi.fn(),
    onIniciarSessao: vi.fn(),
    onParticiparSessao: vi.fn(),
  };

  it('renderiza tags, informações e botões de status', () => {
    render(<Cards {...baseProps} />);
    expect(screen.getByTestId('tags')).toHaveTextContent('NÃO VOTADA-APROVADO-true');
    expect(screen.getByTestId('info')).toHaveTextContent('Título da Pauta: Descrição');
    expect(screen.getByTestId('btn-results')).toBeInTheDocument();
    expect(screen.getByTestId('btn-start')).toBeInTheDocument();
    expect(screen.getByTestId('btn-join')).toBeInTheDocument();
  });

  it('exibe botões de editar e excluir quando permitido', () => {
    render(<Cards {...baseProps} status="NÃO VOTADA" />);
    expect(screen.getByTitle('Editar')).toBeInTheDocument();
    expect(screen.getByTitle('Excluir')).toBeInTheDocument();
  });

  it('oculta botões de editar e excluir quando não permitido', () => {
    render(<Cards {...baseProps} status="VOTADA" />);
    expect(screen.queryByTitle('Editar')).toBeNull();
    expect(screen.queryByTitle('Excluir')).toBeNull();
  });

  it('dispara onEditar e onExcluir ao clicar nos botões', () => {
    render(<Cards {...baseProps} />);
    fireEvent.click(screen.getByTitle('Editar'));
    expect(baseProps.onEditar).toHaveBeenCalledWith(5);
    fireEvent.click(screen.getByTitle('Excluir'));
    expect(baseProps.onExcluir).toHaveBeenCalledWith(5);
  });

  it('encaminha eventos para os botões de status', () => {
    render(<Cards {...baseProps} />);
    fireEvent.click(screen.getByTestId('btn-results'));
    expect(baseProps.onVerResultados).toHaveBeenCalledWith(42);
    fireEvent.click(screen.getByTestId('btn-start'));
    expect(baseProps.onIniciarSessao).toHaveBeenCalledWith(43);
    fireEvent.click(screen.getByTestId('btn-join'));
    expect(baseProps.onParticiparSessao).toHaveBeenCalledWith(44);
  });

  it('exibe título de sessão quando isSessao=true', () => {
    render(<Cards {...baseProps} isSessao={true} />);
    expect(screen.getByTestId('info')).toHaveTextContent('Sessão 5: Descrição');
  });
});

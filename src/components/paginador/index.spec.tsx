import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Paginador from '.';

describe('<Paginador />', () => {
  const aoMudarPagina = vi.fn();

  beforeEach(() => {
    aoMudarPagina.mockClear();
  });

  it('não renderiza quando totalPaginas <= 1', () => {
    const { container } = render(
      <Paginador paginaAtual={1} totalPaginas={1} totalItens={5} aoMudarPagina={aoMudarPagina} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('mostra total de itens corretamente', () => {
    render(
      <Paginador paginaAtual={1} totalPaginas={3} totalItens={42} aoMudarPagina={aoMudarPagina} />,
    );
    expect(screen.getByText('Total encontrado: 42')).toBeInTheDocument();
  });

  it('desabilita botão anterior na primeira página e chama aoMudarPagina ao avançar', () => {
    render(
      <Paginador paginaAtual={1} totalPaginas={3} totalItens={10} aoMudarPagina={aoMudarPagina} />,
    );
    const btnPrev = screen.getByText('‹');
    const btnNext = screen.getByText('›');

    expect(btnPrev).toBeDisabled();
    expect(btnNext).toBeEnabled();

    fireEvent.click(btnNext);
    expect(aoMudarPagina).toHaveBeenCalledWith(2);
  });

  it('renderiza botões de página e muda para página correta ao clicar', () => {
    render(
      <Paginador
        paginaAtual={6}
        totalPaginas={10}
        totalItens={100}
        aoMudarPagina={aoMudarPagina}
      />,
    );

    for (let p = 6; p <= 10; p++) {
      expect(screen.getByText(String(p))).toBeInTheDocument();
    }

    expect(screen.getByText('…')).toBeInTheDocument();

    fireEvent.click(screen.getByText('8'));
    expect(aoMudarPagina).toHaveBeenCalledWith(8);
  });

  it('exibe reticências após o segmento quando há mais páginas', () => {
    render(
      <Paginador paginaAtual={2} totalPaginas={10} totalItens={50} aoMudarPagina={aoMudarPagina} />,
    );
    const ellipses = screen.getAllByText('…');
    expect(ellipses.length).toBe(1);
    fireEvent.click(ellipses[0]);
    expect(aoMudarPagina).toHaveBeenCalledWith(6);
  });

  it('desabilita botão próximo na última página', () => {
    render(
      <Paginador paginaAtual={5} totalPaginas={5} totalItens={25} aoMudarPagina={aoMudarPagina} />,
    );
    const btnNext = screen.getByText('›');
    const btnPrev = screen.getByText('‹');

    expect(btnNext).toBeDisabled();
    expect(btnPrev).toBeEnabled();

    fireEvent.click(btnPrev);
    expect(aoMudarPagina).toHaveBeenCalledWith(4);
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const mockNavigate = vi.fn();

vi.mock('react-toastify', () => ({
  toast: { info: vi.fn() },
}));

vi.mock('react-tooltip', () => ({
  Tooltip: () => <div data-testid="tooltip" />,
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

import { toast } from 'react-toastify';
import LateralNav from '.';
import menuContentItens from '../../utils/content/menuContentItens';
import { UsuarioContext } from '../../context';

describe('<LateralNav />', () => {
  const originalInnerWidth = global.innerWidth;
  const mockLimpar = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.innerWidth = originalInnerWidth;
  });

  const renderNav = () =>
    render(
      <UsuarioContext.Provider value={{ idUsuario: 1, limpar: mockLimpar }}>
        <LateralNav />
      </UsuarioContext.Provider>,
    );

  it('desktop labels visíveis e largura 64', () => {
    global.innerWidth = 1024;
    const { container } = renderNav();
    expect(container.querySelector('aside')?.className).toContain('w-64');
    menuContentItens.forEach((item) => expect(screen.getByText(item.label)).toBeInTheDocument());
  });

  it('toggle collapsed', () => {
    global.innerWidth = 1024;
    const { container } = renderNav();
    const btn = container.querySelector('button')!;
    fireEvent.click(btn);
    expect(container.querySelector('aside')?.className).toContain('w-20');
    fireEvent.click(btn);
    expect(container.querySelector('aside')?.className).toContain('w-64');
  });

  it('navega ao clicar item', () => {
    global.innerWidth = 1024;
    renderNav();
    fireEvent.click(screen.getByText(menuContentItens[0].label));
    expect(mockNavigate).toHaveBeenCalledWith(menuContentItens[0].link);
  });

  it('logout funciona', () => {
    global.innerWidth = 1024;
    renderNav();
    fireEvent.click(screen.getByText('Sair'));
    expect(mockLimpar).toHaveBeenCalled();
    expect(toast.info).toHaveBeenCalledWith('Logout realizado com Sucesso');
  });
});

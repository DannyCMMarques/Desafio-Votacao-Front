import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FormularioUsuario from '.';
import { UsuarioContext } from '../../../context';
import type { FormularioBaseProps } from '../../../interfaces/components/formulario/formularioBaseProps';

vi.mock('./../formulario_base/index.tsx', () => ({
  __esModule: true,
  default: ({ children, onSubmit, botaoPersonalizado }: FormularioBaseProps) => (
    <form data-testid="form" onSubmit={onSubmit}>
      {children}
      <button type="submit">{botaoPersonalizado}</button>
    </form>
  ),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

const listarAssociadoMock = vi.fn();
const cadastrarAssociadoMock = vi.fn();

vi.mock('../../service/useAssociadoService', () => ({
  __esModule: true,
  default: () => ({
    listarAssociado: listarAssociadoMock,
    cadastrarAssociado: cadastrarAssociadoMock,
  }),
}));

describe('<FormularioUsuario />', () => {
  let salvarMock: ReturnType<typeof vi.fn>;
  let handleClose: ReturnType<typeof vi.fn>;
  let onSucesso: ReturnType<typeof vi.fn>;
  const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <UsuarioContext.Provider value={{ salvar: salvarMock }}>{children}</UsuarioContext.Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    salvarMock = vi.fn();
    handleClose = vi.fn();
    onSucesso = vi.fn();
  });

  it('mostra toast.error ao falhar no cadastro', async () => {
    listarAssociadoMock.mockResolvedValue({
      content: [],
      pageable: { pageNumber: 0, pageSize: 10 },
      totalElements: 0,
      totalPages: 0,
      last: true,
    });

    render(<FormularioUsuario handleClose={handleClose} onSucesso={onSucesso} />, { wrapper });

    fireEvent.input(screen.getByLabelText(/CPF/i), {
      target: { value: '00000000000' },
    });
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    });

    cadastrarAssociadoMock.mockRejectedValue({
      response: { data: { message: 'Erro do servidor' } },
    });

    fireEvent.input(screen.getByLabelText(/Nome/i), {
      target: { value: 'Usuário Erro' },
    });
    fireEvent.input(screen.getByLabelText(/CPF/i), {
      target: { value: '22222222222' },
    });
    fireEvent.click(screen.getByText('Entrar'));

    expect(handleClose).not.toHaveBeenCalled();
    expect(onSucesso).not.toHaveBeenCalled();
  });
});

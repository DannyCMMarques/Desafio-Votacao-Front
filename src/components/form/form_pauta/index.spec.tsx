import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import FormularioPauta from '.';
import type { FormularioBaseProps } from '../../../interfaces/components/formulario/formularioBaseProps';

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const cadastrarPautaMock = vi.fn();
const atualizarPautasMock = vi.fn();
const getByIdMock = vi.fn();

vi.mock('../../../service/usePautaService', () => ({
  default: () => ({
    cadastrarPauta: cadastrarPautaMock,
    atualizarPautas: atualizarPautasMock,
    getById: getByIdMock,
  }),
}));

vi.mock('../formulario_base', () => ({
  default: ({ children, onSubmit }: FormularioBaseProps) => (
    <form data-testid="form" onSubmit={onSubmit}>
      {children}
      <button type="submit">Enviar</button>
    </form>
  ),
}));

describe('<FormularioPauta />', () => {
  let handleClose: ReturnType<typeof vi.fn>;
  let onSucesso: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handleClose = vi.fn();
    onSucesso = vi.fn();
    vi.clearAllMocks();
  });

  it('mostra erros de validação se campos vazios', async () => {
    render(<FormularioPauta handleClose={handleClose} onSucesso={onSucesso} />);

    fireEvent.click(screen.getByText('Enviar'));

    expect(await screen.findByText('O título é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('A descrição é obrigatória')).toBeInTheDocument();
  });

  it('chama cadastrarPauta e callbacks em modo de criação', async () => {
    cadastrarPautaMock.mockResolvedValue({
      id: 1,
      titulo: 'T',
      descricao: 'D',
      status: 'NAO_VOTADA',
    });

    render(<FormularioPauta handleClose={handleClose} onSucesso={onSucesso} />);

    fireEvent.input(screen.getByLabelText(/Título/i), { target: { value: 'Minha Pauta' } });
    fireEvent.input(screen.getByLabelText(/Descrição/i), { target: { value: 'Descrição aqui' } });
    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(cadastrarPautaMock).toHaveBeenCalledWith({
        titulo: 'Minha Pauta',
        descricao: 'Descrição aqui',
      });
      expect(handleClose).toHaveBeenCalled();
      expect(onSucesso).toHaveBeenCalled();
    });
  });

  it('carrega valores iniciais e chama atualizarPautas em modo de edição', async () => {
    getByIdMock.mockResolvedValue({
      id: 5,
      titulo: 'Old',
      descricao: 'Old desc',
      status: 'NAO_VOTADA',
    });
    atualizarPautasMock.mockResolvedValue({
      id: 5,
      titulo: 'Edited',
      descricao: 'Edited desc',
      status: 'NAO_VOTADA',
    });

    render(<FormularioPauta id={5} handleClose={handleClose} onSucesso={onSucesso} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Old')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Old desc')).toBeInTheDocument();
    });

    fireEvent.input(screen.getByLabelText(/Título/i), { target: { value: 'Edited' } });
    fireEvent.input(screen.getByLabelText(/Descrição/i), { target: { value: 'Edited desc' } });
    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(atualizarPautasMock).toHaveBeenCalledWith(5, {
        titulo: 'Edited',
        descricao: 'Edited desc',
      });
      expect(handleClose).toHaveBeenCalled();
      expect(onSucesso).toHaveBeenCalled();
    });
  });

  it('mostra toast.error em caso de falha no submit', async () => {
    cadastrarPautaMock.mockRejectedValue({ response: { data: { message: 'Erro X' } } });

    render(<FormularioPauta handleClose={handleClose} onSucesso={onSucesso} />);

    fireEvent.input(screen.getByLabelText(/Título/i), { target: { value: 'T' } });
    fireEvent.input(screen.getByLabelText(/Descrição/i), { target: { value: 'D' } });
    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro X');
    });

    expect(handleClose).not.toHaveBeenCalled();
    expect(onSucesso).not.toHaveBeenCalled();
  });
});

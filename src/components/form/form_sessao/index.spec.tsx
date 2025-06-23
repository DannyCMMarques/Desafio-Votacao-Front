import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import FormularioSessao from '.';

vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

const cadastrarSessaoMock = vi.fn();
const atualizarSessaoMock = vi.fn();
const getByIdMock = vi.fn();

vi.mock('../../../service/useSessaoService', () => ({
    default: () => ({
        cadastrarSessao: cadastrarSessaoMock,
        atualizarSessao: atualizarSessaoMock,
        getById: getByIdMock,
    }),
}));

vi.mock('../formulario_base', () => ({
    default: ({ children, onSubmit }: any) => (
        <form data-testid="form" onSubmit={onSubmit}>
            {children}
            <button type="submit">Enviar</button>
        </form>
    ),
}));

describe('<FormularioSessao />', () => {
    let handleClose: ReturnType<typeof vi.fn>;
    let onSucesso: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        handleClose = vi.fn();
        onSucesso = vi.fn();
        vi.clearAllMocks();
    });

    it('cadastra sessão e chama callbacks', async () => {
        cadastrarSessaoMock.mockResolvedValue({});
        render(<FormularioSessao handleClose={handleClose} onSucesso={onSucesso} />);

        fireEvent.input(
            screen.getByPlaceholderText('Digite o código da pauta'),
            { target: { value: '2' } }
        );
        const durInput = screen.getByRole('spinbutton');
        fireEvent.input(durInput, { target: { value: '20' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'H' } });
        fireEvent.click(screen.getByText('Enviar'));

        await waitFor(() => {
            expect(cadastrarSessaoMock).toHaveBeenCalledWith({
                idPauta: 2,
                duracao: 20,
                unidade: 'H',
            });
            expect(toast.success).toHaveBeenCalledWith('Cadastrado com sucesso');
            expect(handleClose).toHaveBeenCalled();
            expect(onSucesso).toHaveBeenCalled();
        });
    });

    it('edita sessão e chama callbacks', async () => {
        getByIdMock.mockResolvedValue({
            id: 10,
            pauta: { id: 5, titulo: '', descricao: '' },
            duracao: 30,
            status: 'EM_ANDAMENTO',
            unidade: 'SEG',
            horarioInicio: null,
            horarioFim: null,
            votos: [],
        });
        atualizarSessaoMock.mockResolvedValue({});
        render(<FormularioSessao id={10} handleClose={handleClose} onSucesso={onSucesso} />);

        await waitFor(() => {
            expect(getByIdMock).toHaveBeenCalledWith(10);
        });

        const durInput = screen.getByRole('spinbutton');
        fireEvent.input(durInput, { target: { value: '45' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'MIN' } });
        fireEvent.click(screen.getByText('Enviar'));

        await waitFor(() => {
            expect(atualizarSessaoMock).toHaveBeenCalledWith(10, {
                idPauta: 5,
                duracao: 45,
                unidade: 'MIN',
            });
            expect(toast.success).toHaveBeenCalledWith('Editado com sucesso');
            expect(handleClose).toHaveBeenCalled();
            expect(onSucesso).toHaveBeenCalled();
        });
    });

    it('mostra toast.error em caso de falha', async () => {
        cadastrarSessaoMock.mockRejectedValue({ response: { data: { message: 'Erro Y' } } });
        render(<FormularioSessao handleClose={handleClose} onSucesso={onSucesso} />);

        fireEvent.input(
            screen.getByPlaceholderText('Digite o código da pauta'),
            { target: { value: '3' } }
        );
        fireEvent.input(screen.getByRole('spinbutton'), { target: { value: '10' } });
        fireEvent.click(screen.getByText('Enviar'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Erro Y');
            expect(handleClose).not.toHaveBeenCalled();
            expect(onSucesso).not.toHaveBeenCalled();
        });
    });
});

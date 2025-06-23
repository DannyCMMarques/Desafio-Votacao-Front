
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HistoricoVotos from '.';



vi.mock('../../../assets/avatar.png', () => ({
    default: 'avatar.png',
}));


const makeVoto = (id: number, nome: string, voto: 'SIM' | 'NAO') => ({
    id,
    voto,
    associado: { nome },
});

describe('<HistoricoVotos />', () => {
    it('exibe mensagem de sessão sem votos em andamento', () => {
        render(<HistoricoVotos votos={[]} isConcluida={false} />);

        expect(
            screen.getByText(/Ainda não há votos nessa sessão/i)
        ).toBeInTheDocument();
    });

    it('exibe mensagem de sessão concluída sem votos', () => {
        render(<HistoricoVotos votos={[]} isConcluida={true} />);

        expect(
            screen.getByText(/Ninguém votou nessa sessão/i)
        ).toBeInTheDocument();
    });

    it('renderiza lista de votos quando houver registros', () => {
        const votos = [
            makeVoto(1, 'João Silva', 'SIM'),
            makeVoto(2, 'Maria Souza', 'NAO'),
        ];

        render(<HistoricoVotos votos={votos} />);

        expect(screen.getByText('João Silva')).toBeInTheDocument();
        expect(screen.getByText('Maria Souza')).toBeInTheDocument();

        expect(screen.getByText('SIM')).toBeInTheDocument();
        expect(screen.getByText('NAO')).toBeInTheDocument();
    });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { UsuarioContext, UsuarioProvider } from '.';

const Consumer = () => {
    const { idUsuario, salvar, limpar } = useContext(UsuarioContext);
    return (
        <div>
            <span data-testid="valor">{idUsuario ?? 'null'}</span>
            <button data-testid="botao-salvar" onClick={() => salvar(42)}>Salvar</button>
            <button data-testid="botao-limpar" onClick={limpar}>Limpar</button>
        </div>
    );
};

describe('UsuarioContext e UsuarioProvider', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('inicia com idUsuario null quando não há storage', () => {
        render(
            <UsuarioProvider>
                <Consumer />
            </UsuarioProvider>
        );
        expect(screen.getByTestId('valor')).toHaveTextContent('null');
    });

    it('lê idUsuario existente no localStorage', () => {
        localStorage.setItem('idUsuario', '99');
        render(
            <UsuarioProvider>
                <Consumer />
            </UsuarioProvider>
        );
        expect(screen.getByTestId('valor')).toHaveTextContent('99');
    });

    it('salvar() atualiza contexto e localStorage', () => {
        render(
            <UsuarioProvider>
                <Consumer />
            </UsuarioProvider>
        );
        fireEvent.click(screen.getByTestId('botao-salvar'));
        expect(screen.getByTestId('valor')).toHaveTextContent('42');
        expect(localStorage.getItem('idUsuario')).toBe('42');
    });

    it('limpar() zera contexto e remove do localStorage', () => {
        localStorage.setItem('idUsuario', '77');
        render(
            <UsuarioProvider>
                <Consumer />
            </UsuarioProvider>
        );
        expect(screen.getByTestId('valor')).toHaveTextContent('77');
        fireEvent.click(screen.getByTestId('botao-limpar'));
        expect(screen.getByTestId('valor')).toHaveTextContent('null');
        expect(localStorage.getItem('idUsuario')).toBeNull();
    });
});

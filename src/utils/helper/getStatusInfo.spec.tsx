import { describe, it, expect, vi } from 'vitest';
import { getStatusInfo } from './getStatusInfo';
import { estilos } from '../constants/estilos';
import { StatusSessao } from '../enums/StatusSessao';
import { StatusPauta } from '../enums/PautaEnum';
import { FaPlay, FaUsers, FaCheckCircle, FaClock, FaVoteYea } from 'react-icons/fa';

describe('getStatusInfo (sessão)', () => {
  const handlers = {
    onIniciarSessao: vi.fn(),
    onParticiparSessao: vi.fn(),
    onVerResultados: vi.fn(),
  };

  const id = 123;

  it('NAO_INICIADA retorna cor/amarelo, texto e ícone FaPlay, e chama onIniciarSessao', () => {
    const info = getStatusInfo(StatusSessao.NAO_INICIADA, true, id, handlers);
    expect(info.cor).toBe(estilos.amarelo);
    expect(info.texto).toBe('Iniciar Sessão');
    expect(info.icone?.type).toBe(FaPlay);
    expect(info.mostrarVerMais).toBe(true);
    info.acao?.();
    expect(handlers.onIniciarSessao).toHaveBeenCalledWith(id);
  });

  it('EM_ANDAMENTO retorna cor/azul, texto e ícone FaUsers, e chama onParticiparSessao', () => {
    const info = getStatusInfo(StatusSessao.EM_ANDAMENTO, true, id, handlers);
    expect(info.cor).toBe(estilos.azul);
    expect(info.texto).toBe('Participar Sessão');
    expect(info.icone?.type).toBe(FaUsers);
    info.acao?.();
    expect(handlers.onParticiparSessao).toHaveBeenCalledWith(id);
  });

  it('FINALIZADA retorna cor/cinza, texto e ícone FaCheckCircle, e chama onVerResultados', () => {
    const info = getStatusInfo(StatusSessao.FINALIZADA, true, id, handlers);
    expect(info.cor).toBe(estilos.cinza);
    expect(info.texto).toBe('Ver Resultados');
    expect(info.icone?.type).toBe(FaCheckCircle);
    info.acao?.();
    expect(handlers.onVerResultados).toHaveBeenCalledWith(id);
  });
});

describe('getStatusInfo (comum/pauta)', () => {
  const handlers = {
    onParticiparSessao: vi.fn(),
    onVerResultados: vi.fn(),
  };
  const id = 456;

  it('NAO_VOTADA retorna cor/cinzaEscuro e ícone FaClock, sem ação', () => {
    const info = getStatusInfo(StatusPauta.NAO_VOTADA, false, id, handlers);
    expect(info.cor).toBe(estilos.cinzaEscuro);
    expect(info.texto).toBe('Aguardando Início');
    expect(info.icone?.type).toBe(FaClock);
    expect(info.acao).toBeUndefined();
    expect(info.mostrarVerMais).toBe(true);
  });

  it('EM_VOTACAO retorna cor/azul, ícone FaVoteYea e chama onParticiparSessao', () => {
    const info = getStatusInfo(StatusPauta.EM_VOTACAO, false, id, handlers);
    expect(info.cor).toBe(estilos.azul);
    expect(info.texto).toBe('Votar');
    expect(info.icone?.type).toBe(FaVoteYea);
    info.acao?.();
    expect(handlers.onParticiparSessao).toHaveBeenCalledWith(id);
  });

  it('VOTADA retorna cor/cinza, ícone FaCheckCircle e chama onVerResultados', () => {
    const info = getStatusInfo(StatusPauta.VOTADA, false, id, handlers);
    expect(info.cor).toBe(estilos.cinza);
    expect(info.texto).toBe('Ver Resultados');
    expect(info.icone?.type).toBe(FaCheckCircle);
    info.acao?.();
    expect(handlers.onVerResultados).toHaveBeenCalledWith(id);
  });
});

describe('getStatusInfo desconhecido', () => {
  it('retorna default quando status não mapeado', () => {
    const handlers = {};
    const info1 = getStatusInfo('QUALQUER', true, undefined, handlers);
    expect(info1.cor).toBe(estilos.padrao);
    expect(info1.texto).toBe('Desconhecido');
    const info2 = getStatusInfo('QUALQUER', false, undefined, handlers);
    expect(info2.cor).toBe(estilos.padrao);
    expect(info2.texto).toBe('Desconhecido');
  });
});

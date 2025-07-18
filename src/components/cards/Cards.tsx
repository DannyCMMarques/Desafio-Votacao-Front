import { useMemo } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useAcoesItem } from '../../hooks/useAcoesItem';
import BotaoStatusComponent from '../buttons';
import InformacaoResumo from '../informacoes_resumo';
import TagsResumo from '../tags/tagsResumo';
import type { CardsProps } from '../../interfaces/components/cardsProps';
import { StatusPauta, StatusSessao } from '../../utils/helper/StatusUtils';

const Cards = ({
  icon,
  descricao,
  status,
  resultado,
  horarioInicio,
  horarioFim,
  duracao,
  isSessao,
  pautaTitulo,
  id,
  onEditar,
  onExcluir,
  onVerResultados,
  onIniciarSessao,
  onParticiparSessao,
}: CardsProps) => {
  const podeEditarOuExcluir = useMemo(() => {
    return status === StatusSessao.NAO_INICIADA || status === StatusPauta.NAO_VOTADA;
  }, [status]);

  const { aoClicarEditar, aoClicarExcluir } = useAcoesItem(id, onEditar, onExcluir);

  return (
    <div className="bg-indigo-50 rounded-lg p-4 shadow-sm w-full h-full flex flex-col justify-between relative">
      <div className="flex justify-between items-start mb-4">
        <TagsResumo status={status} resultado={resultado} exibirResultado={!isSessao} />
        {podeEditarOuExcluir && (
          <div className="flex gap-2">
            <button
              className="text-gray-600 hover:text-blue-600"
              title="Editar"
              onClick={aoClicarEditar}
            >
              <FiEdit className="w-4 h-4" />
            </button>
            <button
              className="text-gray-600 hover:text-red-600"
              title="Excluir"
              onClick={aoClicarExcluir}
            >
              <FiTrash className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <InformacaoResumo
        icon={icon}
        titulo={isSessao ? `Sessão ${id}` : (pautaTitulo ?? '')}
        descricao={descricao}
        duracao={duracao}
        horarioInicio={horarioInicio ?? undefined}
        horarioFim={horarioFim ?? undefined}
        pautaTitulo={isSessao ? pautaTitulo : undefined}
      />

      <BotaoStatusComponent
        status={status}
        isSessao={isSessao ?? false}
        id={id}
        onVerResultados={onVerResultados}
        onIniciarSessao={onIniciarSessao}
        onParticiparSessao={onParticiparSessao}
      />
    </div>
  );
};

export default Cards;

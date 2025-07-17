import type { VotoResponseDTO } from '../../../service/interfaces/interfaceVotacao';
import VotoItemComponent from '../voto_item';

interface HistoricoVotosProps {
  votos: VotoResponseDTO[];
  isConcluida?: boolean;
}

const HistoricoVotos = ({ votos, isConcluida = false }: HistoricoVotosProps) => (
  <div className="w-full bg-white lg:p-6 sm:p-4 p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Histórico de Votos</h3>
    <div className="space-y-2">
      {votos.length == 0 ? (
        <>
          {!isConcluida ? (
            <p> Ainda não há votos nessa sessão</p>
          ) : (
            <p> Ninguém votou nessa sessão</p>
          )}
        </>
      ) : (
        <>
          {votos.map((voto) => (
            <VotoItemComponent key={voto.id} nome={voto.associado.nome} voto={voto.voto} />
          ))}
        </>
      )}
    </div>
  </div>
);

export default HistoricoVotos;

import {
  FaClock,
  FaVoteYea,
  FaCheckCircle,
  FaPlay,
  FaUsers
} from "react-icons/fa";
import ModalVisualizarData from "../modal/modal-exibicao";

interface BotaoStatusProps {
  status: string;
  isSessao: boolean;
  id?: number;
  onVerResultados?: (id: number) => void;
}

const estilos = {
  cinza: "bg-gray-300 text-gray-700",
  cinzaEscuro: "bg-gray-600 text-white",
  azul: "bg-blue-600 text-white",
  amarelo: "bg-yellow-100 text-yellow-900",
  padrao: "bg-gray-500 text-white"
};

const BotaoStatusComponent = ({ status, isSessao, id, onVerResultados }: BotaoStatusProps) => {
  let cor = estilos.padrao;
  let texto = "Desconhecido";
  let icone = null;
  let mostrarVerMais = false;
  let acao: (() => void) | undefined = undefined;

  if (!isSessao) {
    switch (status) {
      case "NÃO VOTADA":
        cor = estilos.cinzaEscuro;
        texto = "Aguardando Início";
        icone = <FaClock className="mr-2" />;
        mostrarVerMais = true;
        break;
      case "EM VOTAÇÃO":
        cor = estilos.azul;
        texto = "Votar";
        icone = <FaVoteYea className="mr-2" />;
        break;
      case "VOTADA":
        cor = estilos.cinza;
        texto = "Ver Resultados";
        icone = <FaCheckCircle className="mr-2" />;
        acao = () => onVerResultados?.(id!);
        break;
    }
  } else {
    switch (status) {
      case "NÃO INICIADA":
        cor = estilos.amarelo;
        texto = "Iniciar Sessão";
        icone = <FaPlay className="mr-2" />;
        mostrarVerMais = true;
        break;
      case "EM ANDAMENTO":
        cor = estilos.azul;
        texto = "Participar Sessão";
        icone = <FaUsers className="mr-2" />;
        break;
      case "FINALIZADA":
        cor = estilos.cinza;
        texto = "Ver Resultados";
        icone = <FaCheckCircle className="mr-2" />;
        acao = () => onVerResultados?.(id!);
        break;
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-2">
      <button
        onClick={acao}
        className={`w-full cursor-pointer px-4 py-2 text-sm font-semibold rounded-md transition flex items-center justify-center ${cor}`}
      >
        {icone}
        {texto}
      </button>

      <div className="flex justify-between items-center text-sm text-gray-600">
        {mostrarVerMais && id !== undefined ? (
          <ModalVisualizarData id={id}>
            <span className="underline hover:text-gray-800 cursor-pointer">
              Ver Mais
            </span>
          </ModalVisualizarData>
        ) : (
          <span></span>
        )}

        {id !== undefined && (
          <span className="text-xs text-gray-500">cod.: {id}</span>
        )}
      </div>
    </div>
  );
};

export default BotaoStatusComponent;

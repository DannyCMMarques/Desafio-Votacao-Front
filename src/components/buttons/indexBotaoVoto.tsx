import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const BotaoVoto = ({ onVotar }: { onVotar: (voto: 'SIM' | 'NAO') => void }) => (
  <div className="flex flex-col gap-4">
    <button
      className="bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 flex items-center justify-center gap-2"
      onClick={() => onVotar('SIM')}
    >
      <FaThumbsUp className="text-lg" />
      SIM
    </button>
    <button
      className="bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 flex items-center justify-center gap-2"
      onClick={() => onVotar('NAO')}
    >
      <FaThumbsDown className="text-lg" />
      NÃO
    </button>
  </div>
);
export default BotaoVoto;
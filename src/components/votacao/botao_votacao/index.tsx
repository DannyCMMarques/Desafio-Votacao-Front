import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const BotaoVotoComponent = ({ onVotar }: { onVotar: (voto:boolean) => void }) => (
  <div className="flex flex-col gap-4 w-full px-4">
    <button
      className="bg-green-600 cursor-pointer text-white font-semibold py-5 rounded-2xl hover:bg-green-700 flex items-center justify-center gap-2"
      onClick={() => onVotar(true)}
    >
      <FaThumbsUp className="text-lg" />
      SIM
    </button>
    <button
      className="bg-red-600 cursor-pointer text-white font-semibold py-5 rounded-2xl hover:bg-red-700 flex items-center justify-center gap-2"
      onClick={() => onVotar(false)}
    >
      <FaThumbsDown className="text-lg" />
      NÃO
    </button>
  </div>
);
export default BotaoVotoComponent;

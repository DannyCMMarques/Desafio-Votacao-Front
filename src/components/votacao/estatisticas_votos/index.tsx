import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const EstatisticasVotos = ({ total, sim, nao }: { total: number, sim: number, nao: number }) => {
    const simPct = total === 0 ? 0 : Math.round((sim / total) * 100);
    const naoPct = total === 0 ? 0 : Math.round((nao / total) * 100);

    return (
        <div className="text-sm space-y-4">
            <div className="flex justify-between">
                <p className="text-gray-800 ">Total de Votos:</p>
                <p className="font-bold">{total}</p>

            </div>

            <div>
                <div className="flex justify-between items-center text-green-600 font-medium mb-1">
                    <div className="flex items-center gap-1">
                        <FaThumbsUp />
                        SIM
                    </div>
                    <span className="text-sm font-semibold text-green-700">{sim} ({simPct}%)</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-4 bg-green-500 rounded-full" style={{ width: `${simPct}%` }} />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center text-red-600 font-medium mb-1">
                    <div className="flex items-center gap-1">
                        <FaThumbsDown />
                        NÃO
                    </div>
                    <span className="text-sm font-semibold text-red-700">{nao} ({naoPct}%)</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-4 bg-red-500 rounded-full" style={{ width: `${naoPct}%` }} />
                </div>
            </div>
        </div>
    );
};

export default EstatisticasVotos;

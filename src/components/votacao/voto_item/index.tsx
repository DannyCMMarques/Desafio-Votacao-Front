import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import avatar from "././../../../assets/avatar.png"
type VotoItemProps = {
    nome: string;
    voto: "SIM" | "NAO";
};

const VotoItemComponent = ({ nome, voto }: VotoItemProps) => {
    const isSim = voto === "SIM";
    const iconColor = isSim ? "text-green-600" : "text-red-600";
    const bgColor = isSim ? "bg-green-50" : "bg-red-50";
    const badgeColor = isSim ? "bg-green-600" : "bg-red-600";
    const Icon = isSim ? FaThumbsUp : FaThumbsDown;

    return (
        <div className={`flex items-center justify-between px-4 py-2 rounded-md ${bgColor}`}>
            <div className="flex items-center gap-3">
                <img
                    src={avatar}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover border"
                />
                <div>
                    <p className="font-medium text-gray-800">{nome}</p>
                </div>
            </div>

            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-semibold ${badgeColor}`}>
                <Icon className="text-sm" />
                {voto}
            </span>
        </div>
    );
};

export default VotoItemComponent;

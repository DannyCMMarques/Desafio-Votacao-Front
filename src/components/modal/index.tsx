import type { ReactNode } from "react";
import { IoMdCloseCircle } from "react-icons/io";

type ModalProps = {
    children: ReactNode;
    onFechar?: () => void;
    tamanho?: "sm" | "md" | "lg" | "xl"; 
};

const Modal = ({ children, onFechar, tamanho = "md" }: ModalProps) => {
    const tamanhoClasse = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
    }[tamanho];

    return (
        <div className="fixed inset-0 z-50 bg-gray-600/50 flex items-center justify-center p-4">
            <div className={`bg-white rounded-lg shadow-lg w-full ${tamanhoClasse} max-h-screen mt-16 mb-9  overflow-y-auto p-6 relative`}>
                {onFechar && (
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                        onClick={onFechar}
                    >
                        <IoMdCloseCircle />
                    </button>
                )}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;

import type { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";

interface FormularioBaseProps {
    id?: number;
    titulo?: string;
    icone: ReactNode;
    onSubmit: (data: T) => void;
    children: ReactNode;
    tituloPersonalizado?: string;
    botaoPersonalizado?: string;
}

const FormularioBase = ({ id, titulo, icone, onSubmit, children, tituloPersonalizado, botaoPersonalizado }: FormularioBaseProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6 text-gray-800">

            <div className="flex items-center gap-2 mb-4">
                {icone}
                <h2 className="text-lg font-bold">
                    {tituloPersonalizado ?? (id ? `Editar ${titulo}` : `Cadastrar ${titulo}`)}
                </h2>
            </div>

            {children}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-5 py-2.5 cursor-pointer font-semibold  bg-indigo-700 text-white text-sm rounded-md hover:bg-indigo-800 transition"
                >
                    {botaoPersonalizado ?? (id ? "Salvar alterações" : "Cadastrar")}
                    { }
                </button>
            </div>
        </form>
    );
};

export default FormularioBase;

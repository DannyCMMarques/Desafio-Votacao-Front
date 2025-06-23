import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoNewspaper } from "react-icons/io5";
import { toast } from "react-toastify";
import { z } from "zod";
import type { PautaRequestDTO } from "../../../service/interfaces/interfacePauta";
import usePautaService from "../../../service/usePautaService";
import FormularioBase from "../formulario_base";


interface FormularioPautaProps {
    id?: number;
    handleClose: () => void;
    onSucesso: () => void;
}

const schema = z.object({
    titulo: z.string().min(1, "O título é obrigatório"),
    descricao: z.string().min(1, "A descrição é obrigatória"),
});

const FormularioPauta = ({ id, handleClose, onSucesso }: FormularioPautaProps) => {

    const pautaService = usePautaService();

    const { register, handleSubmit, formState: { errors } } =
        useForm<PautaRequestDTO>({
            resolver: zodResolver(schema),
            defaultValues: async () => {
                if (!id) return { titulo: "", descricao: "" };
                const pauta = await pautaService.getById(id);
                return { titulo: pauta.titulo, descricao: pauta.descricao };
            },
        });


    const onSubmit = async (data: PautaRequestDTO) => {
        try {
            if (id) {
                await pautaService.atualizarPautas(id, data);
                toast.success("Editado com sucesso");
            } else {
                await pautaService.cadastrarPauta(data);
                toast.success("Cadastrado com sucesso");
            }

            handleClose();
            onSucesso();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Erro ao salvar pauta");
        }
    };

    return (
        <FormularioBase
            id={id}
            titulo="Pauta"
            icone={<IoNewspaper className="text-indigo-700 text-2xl" />}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <label htmlFor="titulo" className="block text-sm font-semibold mb-1">
                    Título
                </label>
                <input
                    id="titulo"
                    type="text"
                    {...register("titulo")}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                    placeholder="Digite o título da pauta"
                />
                {errors.titulo && (
                    <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="descricao" className="block text-sm font-semibold mb-1">
                    Descrição
                </label>
                <textarea
                    id="descricao"
                    rows={5}
                    {...register("descricao")}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                    placeholder="Digite a descrição da pauta"
                />
                {errors.descricao && (
                    <p className="text-red-500 text-sm mt-1">{errors.descricao.message}</p>
                )}
            </div>
        </FormularioBase>
    );
};

export default FormularioPauta;

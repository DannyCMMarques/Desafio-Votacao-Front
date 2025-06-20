import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { IoCalendar } from "react-icons/io5";
import { toast } from "react-toastify";
import useSessaoService from "../../../service/useSessaoService";
import type { PautaResponseDTO } from "../../../service/interfaces/interfacePauta";
import type { SessaoRequestDTO } from "../../../service/interfaces/interfaceSessao";
import { useFormularioEdicao } from "../../../hooks";
import FormularioBase from "../formulario_base";



interface FormularioSessaoProps {
    id?: number;
    handleClose: () => void;
    onSucesso: () => void;
}


const FormularioSessao = ({ id, handleClose, onSucesso }: FormularioSessaoProps) => {
    const sessaoService = useSessaoService();
    const [pautaSelecionada, setPautaSelecionada] = useState<PautaResponseDTO | null>(null);
    const [codigoPauta, setCodigoPauta] = useState("");

const schema = z.object({
    idPauta: z.number({ required_error: "Digite o código da pauta" }),
    duracao: z.number().min(1, "Duração deve ser maior que 0"),
    unidade: z.enum(["SEG", "MIN", "H"]),
});
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<SessaoRequestDTO>({
        resolver: zodResolver(schema),
        defaultValues: {
            duracao: 30,
            unidade: "MIN",
        },
    });

    useFormularioEdicao({
        id,
        getById: sessaoService.getById,
        reset,
        onSetExtraState: (data) => {
            setCodigoPauta(String(data.pauta.id));
            setPautaSelecionada(data.pauta);
        },
    });

    const handleCodigoPautaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCodigoPauta(value);
        const numeric = parseInt(value);
        if (!isNaN(numeric)) {
            setValue("idPauta", numeric);
        }
    };

    const onSubmit = async (data: SessaoRequestDTO) => {
        try {
            if (id) {
                await sessaoService.atualizarSessao(id, data);
                toast.success("Editado com sucesso");
            } else {
                await sessaoService.cadastrarSessao(data);
                toast.success("Cadastrado com sucesso");
            }

            handleClose();
            onSucesso();
        } catch (err) {
            console.error("Erro ao salvar sessão:", err);
            toast.error(err.response?.data?.message ?? "Erro ao salvar sessão");
        }
    };

    return (
        <FormularioBase
            id={id}
            titulo="Sessão"
            icone={<IoCalendar className="text-indigo-700 text-2xl" />}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="relative">
                <label htmlFor="pauta-id" className="block text-sm font-semibold mb-1">
                    Código da Pauta
                </label>
                <input
                    id="pauta-id"
                    type="text"
                    value={codigoPauta}
                    onChange={handleCodigoPautaChange}
                    placeholder="Digite o código da pauta"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                />
                {errors.idPauta && (
                    <p className="text-red-500 text-sm mt-1">{errors.idPauta.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="duracao" className="block text-sm font-semibold mb-1">
                    Duração
                </label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        min={1}
                        {...register("duracao", { valueAsNumber: true })}
                        className="w-2/3 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                    />
                    <select
                        {...register("unidade")}
                        className="w-1/3 px-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                    >
                        <option value="SEG">Segundos</option>
                        <option value="MIN">Minutos</option>
                        <option value="H">Horas</option>
                    </select>
                </div>
                {errors.duracao && (
                    <p className="text-red-500 text-sm mt-1">{errors.duracao.message}</p>
                )}
            </div>
        </FormularioBase>
    );
};

export default FormularioSessao;

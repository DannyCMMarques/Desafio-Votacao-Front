import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import usePautaService from '../../service/usePautaService';
import type { PautaRequestDTO, PautaResponseDTO } from '../../service/interfaces/interfacePauta';
import { schemaPautas } from '../../utils/helper/schemas/schemaFormularioPautas';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import axios from 'axios';

export function useFormularioPauta(onSucesso: () => void, handleClose: () => void, id?: number) {
  const pautaService = usePautaService();
  const [pautaAtual, setPautaAtual] = useState<PautaResponseDTO | null>(null);

  const form = useForm<PautaRequestDTO>({
    resolver: zodResolver(schemaPautas),
    defaultValues: async () => {
      if (!id) return { titulo: '', descricao: '' };
      const pauta = await pautaService.getById(id);
      setPautaAtual(pauta);
      return { titulo: pauta.titulo, descricao: pauta.descricao };
    },
  });

  const salvar = async (data: PautaRequestDTO) => {
    if (id) {
      await pautaService.atualizarPautas(id, data);
      return 'Editado';
    } else {
      await pautaService.cadastrarPauta(data);
      return 'Cadastrado';
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const acao = await salvar(data);
      toast.success(`${acao} com sucesso`);
      handleClose();
      onSucesso();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message: string }>;
        toast.error(axiosErr.response?.data?.message ?? 'Erro ao salvar pauta');
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Erro ao salvar pauta');
      }
    }
  });
  return {
    ...form,
    pautaAtual,
    salvar,
    onSubmit,
    errors,
    register,
  };
}

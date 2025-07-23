import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import usePautaService from '../../service/usePautaService';
import { schemaPautas } from '../../utils/helper/schemas/schemaFormularioPautas';
import type { PautaRequestDTO, PautaResponseDTO } from '../../interfaces/interfacePauta';

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
      const message =
        err?.response?.data?.message ??
        (err instanceof Error ? err.message : undefined) ??
        'Erro ao salvar pauta';

      toast.error(message);
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

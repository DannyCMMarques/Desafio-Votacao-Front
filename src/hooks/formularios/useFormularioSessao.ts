import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSessaoService from '../../service/useSessaoService';
import { schemaSessao } from '../../utils/helper/schemas/schemaFormularioSessao';
import type { SessaoRequestDTO } from '../../interfaces/interfaceSessao';
import type { PautaResponseDTO } from '../../interfaces/interfacePauta';

export const useFormularioSessao = (
  onSucesso: () => void,
  handleClose: () => void,
  id?: number,
) => {
  const sessaoService = useSessaoService();
  const [pautaSelecionada, setPautaSelecionada] = useState<PautaResponseDTO | null>(null);

  const form = useForm<SessaoRequestDTO>({
    resolver: zodResolver(schemaSessao),
    defaultValues: async () => {
      if (!id) return { idPauta: 1, duracao: 30, unidade: 'MIN' };
      const sessao = await sessaoService.getById(id);
      setPautaSelecionada(sessao.pauta);

      return {
        idPauta: sessao.pauta.id!,
        duracao: sessao.duracao,
        unidade: 'MIN',
      };
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const salvar = async (data: SessaoRequestDTO) => {
    if (id) {
      await sessaoService.atualizarSessao(id, data);
      return 'Editado';
    } else {
      await sessaoService.cadastrarSessao(data);
      return 'Cadastrado';
    }
  };
  const onSubmit = handleSubmit(async (data: SessaoRequestDTO) => {
    try {
      const acao = await salvar(data);
      toast.success(`${acao} com sucesso`);
      handleClose();
      onSucesso();
    } catch (err: unknown) {
      const message =
        err?.response?.data?.message ??
        (err instanceof Error ? err.message : undefined) ??
        'Erro ao salvar sessão';
      toast.error(message);
      console.error(err);
    }
  });
  return {
    ...form,
    pautaSelecionada,
    salvar,
    onSubmit,
    errors,
    register,
  };
};

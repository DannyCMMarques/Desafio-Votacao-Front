import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import useSessaoService from '../../service/useSessaoService';
import type { SessaoRequestDTO } from '../../service/interfaces/interfaceSessao';
import type { PautaResponseDTO } from '../../service/interfaces/interfacePauta';
import { schemaSessao } from '../../utils/helper/schemas/schemaFormularioSessao';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import axios from 'axios';

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
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message: string }>;
        toast.error(axiosErr.response?.data?.message ?? 'Erro ao salvar sessão');
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Erro ao salvar sessão');
      }

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

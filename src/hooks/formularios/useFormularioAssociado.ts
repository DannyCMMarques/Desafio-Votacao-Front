import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UsuarioContext } from '../../context';
import type {
  AssociadoPage,
  AssociadoRequestDTO,
} from '../../service/interfaces/interfaceAssociados';
import useAssociadoService from '../../service/useAssociadoService';
import { cadastroSchema, loginSchema } from '../../utils/helper/schemas/schemaFormularioUsuario';
import axios from 'axios';

export type FormData = {
  cpf: string;
  nome?: string;
};
export function useFormularioUsuario(onSucesso: () => void, handleClose: () => void) {
  const associadoService = useAssociadoService();
  const { salvar } = useContext(UsuarioContext);

  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const schema = useMemo(() => (mostrarCadastro ? cadastroSchema : loginSchema), [mostrarCadastro]);

  const defaultValues = useMemo(
    () => (mostrarCadastro ? { nome: '', cpf: '' } : { cpf: '' }),
    [mostrarCadastro],
  );

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    reset(defaultValues);
  }, [mostrarCadastro, reset, defaultValues]);

  const onLogin = async (data: FormData) => {
    try {
      const page: AssociadoPage = await associadoService.listarAssociado(
        undefined,
        undefined,
        undefined,
        undefined,
        data.cpf,
      );
      const encontrados = page.content;
      if (encontrados.length > 0) {
        salvar(encontrados[0].id);
        toast.info('Usuário logado com sucesso!');
        handleClose();
        onSucesso();
      } else {
        setMostrarCadastro(true);
        toast.info('CPF não encontrado. Preencha o nome para se cadastrar.');
      }
    } catch {
      toast.error('Erro ao verificar CPF.');
    }
  };

  const onCadastro = async (data: FormData) => {
    try {
      if (!('nome' in data)) {
        toast.error('Dados de cadastro faltando nome.');
        return;
      }
      const dto = data as AssociadoRequestDTO;

      const novo = await associadoService.cadastrarAssociado(dto);
      salvar(novo.id);
      toast.success('Usuário cadastrado com sucesso');
      handleClose();
      onSucesso();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Erro ao salvar usuário');
      }
    }
  };

  const onSubmit = handleSubmit(mostrarCadastro ? onCadastro : onLogin);

  return {
    register,
    errors,
    onSubmit,
    mostrarCadastro,
    setMostrarCadastro,
  };
}

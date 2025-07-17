import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoPersonCircle } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { UsuarioContext } from '../../../context';
import type {
  AssociadoPage,
  AssociadoRequestDTO,
} from '../../../service/interfaces/interfaceAssociados';
import useAssociadoService from '../../../service/useAssociadoService';
import FormularioBase from '../formulario_base';

interface FormularioUsuarioProps {
  handleClose: () => void;
  onSucesso: () => void;
}

const FormularioUsuario = ({ handleClose, onSucesso }: FormularioUsuarioProps) => {
  const associadoService = useAssociadoService();
  const { salvar } = useContext(UsuarioContext);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const schema1 = z.object({
    cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
  });
  const schema2 = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
  });

  const schema = useMemo(() => {
    return mostrarCadastro ? schema2 : schema1;
  }, [mostrarCadastro]);

  const defaultValues = useMemo(
    () => (mostrarCadastro ? { nome: '', cpf: '' } : { cpf: '' }),
    [mostrarCadastro],
  );

  type FormData = { cpf: string } | AssociadoRequestDTO;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (formData: FormData) => {
    try {
      const associadoPage: AssociadoPage = await associadoService.listarAssociado(
        undefined,
        undefined,
        undefined,
        undefined,
        formData.cpf,
      );
      const associado = associadoPage?.content;
      if (associado.length !== 0) {
        salvar(associado[0].id);
        toast.info('Usuário logado com sucesso!');
        handleClose();
        onSucesso();
      } else {
        setMostrarCadastro(true);
        toast.info('CPF não encontrado. Preencha o nome para se cadastrar.');
      }
    } catch (err) {
      toast.error('Erro ao verificar CPF.');
    }
  };

  const onFinalizarCadastro = async (data: AssociadoRequestDTO) => {
    try {
      const novo = await associadoService.cadastrarAssociado(data);
      salvar(novo.id);
      toast.success('Usuário cadastrado com sucesso');
      handleClose();
      onSucesso();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Erro ao salvar usuário');
    }
  };

  useEffect(() => {
    if (mostrarCadastro) {
      reset({ nome: '', cpf: '' });
    } else {
      reset({ cpf: '' });
    }
  }, [mostrarCadastro]);

  return (
    <FormularioBase
      tituloPersonalizado={mostrarCadastro ? 'Cadastre-se' : 'Bem-vindo de volta :)'}
      icone={<IoPersonCircle className="text-indigo-700 text-2xl" />}
      onSubmit={handleSubmit(mostrarCadastro ? onFinalizarCadastro : onSubmit)}
      botaoPersonalizado="Entrar"
    >
      {!mostrarCadastro && (
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            Insira seu <span className="font-semibold">CPF</span> para continuar a votação
          </p>
        </div>
      )}

      {mostrarCadastro && (
        <>
          <div className="mb-4">
            <p className="text-sm text-gray-600 leading-tight">
              Ainda não cadastrado?{' '}
              <span className="text-indigo-600 font-medium">Cadastre-se agora para votar</span>
            </p>
          </div>

          <div>
            <label htmlFor="nome" className="block text-sm font-semibold mb-1">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              {...register('nome')}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700"
              placeholder="Digite o nome do usuário"
            />
            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
          </div>
        </>
      )}

      <div>
        <label htmlFor="cpf" className="block text-sm font-semibold mb-1">
          CPF
        </label>
        <input
          id="cpf"
          type="text"
          {...register('cpf')}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700"
          placeholder="Digite o CPF (apenas números)"
        />
        {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>}
      </div>
    </FormularioBase>
  );
};

export default FormularioUsuario;

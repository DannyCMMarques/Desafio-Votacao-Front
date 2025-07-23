import { IoPersonCircle } from 'react-icons/io5';
import type { FormularioUsuarioProps } from '../../../interfaces/components/formulario/formularioUsuarioProps';

import { useFormularioUsuario } from '../../../hooks/formularios/useFormularioAssociado';
import FormularioBase from '../formulario_base';

const FormularioUsuario = ({ handleClose, onSucesso }: FormularioUsuarioProps) => {
  const { register, errors, onSubmit, mostrarCadastro } = useFormularioUsuario(
    onSucesso,
    handleClose,
  );

  return (
    <FormularioBase
      tituloPersonalizado={mostrarCadastro ? 'Cadastre-se' : 'Bem-vindo de volta :)'}
      icone={<IoPersonCircle className="text-indigo-700 text-2xl" />}
      onSubmit={onSubmit}
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

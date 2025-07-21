import { IoNewspaper } from 'react-icons/io5';
import { useFormularioPauta } from '../../../hooks/formularios/useFormularioPauta';
import type { FormularioPautaProps } from '../../../interfaces/components/formulario/formularioPautaProps';
import FormularioBase from '../formulario_base';

const FormularioPauta = ({ id, handleClose, onSucesso }: FormularioPautaProps) => {
  const {
    register,
    formState: { errors },
    onSubmit,
  } = useFormularioPauta(handleClose, onSucesso, id);

  return (
    <FormularioBase
      id={id}
      titulo="Pauta"
      icone={<IoNewspaper className="text-indigo-700 text-2xl" />}
      onSubmit={onSubmit}
    >
      <div>
        <label htmlFor="titulo" className="block text-sm font-semibold mb-1">
          Título
        </label>
        <input
          id="titulo"
          type="text"
          {...register('titulo')}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700"
          placeholder="Digite o título da pauta"
        />
        {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>}
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-semibold mb-1">
          Descrição
        </label>
        <textarea
          id="descricao"
          rows={5}
          {...register('descricao')}
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

import { IoCalendar } from 'react-icons/io5';
import { useFormularioSessao } from '../../../hooks/formularios/useFormularioSessao';
import type { FormularioSessaoProps } from '../../../interfaces/components/formulario/formularioSessaoProps';
import FormularioBase from '../formulario_base';

const FormularioSessao = ({ id, handleClose, onSucesso }: FormularioSessaoProps) => {
  const {
    register,
    onSubmit,
    formState: { errors },
  } = useFormularioSessao(handleClose, onSucesso, id);

  return (
    <FormularioBase
      id={id}
      titulo="Sessão"
      icone={<IoCalendar className="text-indigo-700 text-2xl" />}
      onSubmit={onSubmit}
    >
      <div className="relative">
        <label htmlFor="pauta-id" className="block text-sm font-semibold mb-1">
          Código da Pauta
        </label>
        <input
          type="text"
          {...register('idPauta', { valueAsNumber: true })}
          className="w-full px-4 py-3 rounded-md border"
          placeholder="Digite o código da pauta"
        />
        {errors.idPauta && <p className="text-red-500 text-sm mt-1">{errors.idPauta.message}</p>}
      </div>

      <div>
        <label htmlFor="duracao" className="block text-sm font-semibold mb-1">
          Duração
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            {...register('duracao', { valueAsNumber: true })}
            className="w-2/3 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700"
          />
          <select
            {...register('unidade')}
            className="w-1/3 px-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700"
          >
            <option value="SEG">Segundos</option>
            <option value="MIN">Minutos</option>
            <option value="H">Horas</option>
          </select>
        </div>
        {errors.duracao && <p className="text-red-500 text-sm mt-1">{errors.duracao.message}</p>}
      </div>
    </FormularioBase>
  );
};

export default FormularioSessao;

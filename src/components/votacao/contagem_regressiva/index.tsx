import { useTimer } from 'react-timer-hook';
import type { ContagemRegressivaProps } from '../../../interfaces/components/votacao/contagemRegressivaProps';
import { converterParaDataIso } from '../../../utils/helper/converterParaDataIso';
export default function ContagemRegressivaComponent({
  inicio,
  duracaoEmMinutos,
  onExpired,
}: ContagemRegressivaProps) {
  const isoInicio = converterParaDataIso(inicio);
  const dataInicio = new Date(isoInicio);
  const expiryTimestamp = new Date(dataInicio.getTime() + duracaoEmMinutos * 60 * 1000);
  const { hours, minutes, seconds, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: () => onExpired(),
  });

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2">
      ⏳ Termina em: {format(hours)}:{format(minutes)}:{format(seconds)}
      {!isRunning && <span className="ml-2 text-xs">(Finalizado)</span>}
    </div>
  );
}

import { z } from 'zod';

export const schemaSessao = z.object({
  idPauta: z.number({ required_error: 'Digite o código da pauta' }),
  duracao: z.number().min(1, 'Duração deve ser maior que 0'),
  unidade: z.enum(['SEG', 'MIN', 'H']),
});

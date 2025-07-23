export const StatusSessao = {
  NAO_INICIADA: 'NAO_INICIADA',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
  FINALIZADA: 'FINALIZADA',
} as const;

export type StatusSessao = (typeof StatusSessao)[keyof typeof StatusSessao];

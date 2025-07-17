export const StatusSessao = {
  NAO_INICIADA: 'NAO_INICIADA',
} as const;

export type StatusSessao = (typeof StatusSessao)[keyof typeof StatusSessao];

export const StatusPauta = {
  NAO_VOTADA: 'NAO_VOTADA',
  EM_VOTACAO: 'EM_VOTACAO',
} as const;

export type StatusPauta = (typeof StatusPauta)[keyof typeof StatusPauta];

export const ResultadoPauta = {
  EM_ANDAMENTO: 'EM_ANDAMENTO',
} as const;

export type ResultadoPauta = (typeof ResultadoPauta)[keyof typeof ResultadoPauta];

const statusLabels: Record<string, string> = {
  NAO_INICIADA: 'NÃO INICIADA',
  EM_ANDAMENTO: 'EM ANDAMENTO',
  NAO_VOTADA: 'NÃO VOTADA',
  EM_VOTACAO: 'EM VOTAÇÃO',
};

export const handleStatus = (status: string): string => {
  return statusLabels[status] ?? status;
};

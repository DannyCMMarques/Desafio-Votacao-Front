export const StatusPauta = {
  NAO_VOTADA: 'NAO_VOTADA',
  EM_VOTACAO: 'EM_VOTACAO',
  VOTADA: 'VOTADA',
} as const;

export type StatusPauta = (typeof StatusPauta)[keyof typeof StatusPauta];

export const ResultadoPauta = {
  APROVADO: 'APROVADO',
  REPROVADO: 'REPROVADO',
  INDECISIVO: 'INDECISIVO',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
} as const;

export type ResultadoPauta = (typeof ResultadoPauta)[keyof typeof ResultadoPauta];

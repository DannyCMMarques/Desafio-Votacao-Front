export type PaginadorProps = {
  paginaAtual: number;
  totalPaginas: number;
  totalItens: number;
  aoMudarPagina: (novaPagina: number) => void;
};

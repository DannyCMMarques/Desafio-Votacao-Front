export interface UseIniciarSessaoProps {
  exibirSessoes: (page: number) => Promise<void>;
  pagina: number;
}

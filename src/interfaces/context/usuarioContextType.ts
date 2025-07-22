export type UsuarioContextType = {
  idUsuario: number | null;
  salvar: (id: number) => void;
  limpar: () => void;
};

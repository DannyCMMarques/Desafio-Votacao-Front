import { createContext, useState } from 'react';

type UsuarioContextType = {
  idUsuario: number | null;
  salvar: (id: number) => void;
  limpar: () => void;
};

const UsuarioContext = createContext<UsuarioContextType>({
  idUsuario: null,
  salvar: () => {},
  limpar: () => {},
});

const UsuarioProvider = ({ children }: { children: React.ReactNode }) => {
  const handleGetIdUsuario = () => {
    const local = localStorage.getItem('idUsuario');
    return local ? Number(local) : null;
  };

  const [idUsuario, setIdUsuario] = useState<number | null>(handleGetIdUsuario);

  const salvar = (id: number) => {
    localStorage.setItem('idUsuario', id.toString());
    setIdUsuario(id);
  };

  const limpar = () => {
    localStorage.removeItem('idUsuario');
    setIdUsuario(null);
  };

  return (
    <UsuarioContext.Provider value={{ idUsuario, salvar, limpar }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export { UsuarioProvider, UsuarioContext };

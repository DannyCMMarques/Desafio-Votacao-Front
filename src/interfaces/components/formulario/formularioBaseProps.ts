import type { FormEventHandler, ReactNode } from 'react';

export interface FormularioBaseProps {
  id?: number;
  titulo?: string;
  icone: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  tituloPersonalizado?: string;
  botaoPersonalizado?: string;
}

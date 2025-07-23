export type ModalCardType = 'formulario' | 'resultado';

export interface ModalCardState {
  tipo: ModalCardType;
  id?: number;
}

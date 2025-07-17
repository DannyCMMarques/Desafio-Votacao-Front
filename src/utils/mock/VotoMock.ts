import type { VotoRequestDTO, VotoResponseDTO } from '../../service/interfaces/interfaceVotacao';

import { mockAssociados } from './AssociadoMock';

export const mockVotoRequestSim: VotoRequestDTO = {
  voto: true,
  associado: mockAssociados[0].id,
};

export const mockVotoRequestNao: VotoRequestDTO = {
  voto: false,
  associado: mockAssociados[1].id,
};

export const mockVotos: VotoResponseDTO[] = [
  { id: 1, voto: 'SIM', associado: mockAssociados[0] },
  { id: 2, voto: 'NAO', associado: mockAssociados[1] },
  { id: 3, voto: 'SIM', associado: mockAssociados[2] },
];

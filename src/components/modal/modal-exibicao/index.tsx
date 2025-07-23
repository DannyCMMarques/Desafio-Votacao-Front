import Modal from '..';
import VisualizarPauta from '../../visualizar-dados-pauta/index';
import VisualizarSessao from '../../visualizar-dados-sessao';
import type { ModalVisualizarDataProps } from '../../../interfaces/components/modalProps';
import { useModal } from '../../../hooks/useModal';

const ModalVisualizarData = ({ id, isSessao, children, size = 'md' }: ModalVisualizarDataProps) => {
  const { isOpenModal, handleAbrirModal, handleFecharModal } = useModal();
  return (
    <>
      <button
        onClick={handleAbrirModal}
        className="text-[12px] text-indigo-700 font-bold hover:underline bg-transparent p-0"
      >
        {children}
      </button>

      {isOpenModal && (
        <Modal onFechar={handleFecharModal} tamanho={size}>
          {isSessao ? <VisualizarSessao id={id} /> : <VisualizarPauta id={id} />}
        </Modal>
      )}
    </>
  );
};

export default ModalVisualizarData;

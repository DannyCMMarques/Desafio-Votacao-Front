import { useState } from "react";
import Modal from "..";
import VisualizarPauta from '../../visualizar-dados-pauta/index';
import VisualizarSessao from "../../visualizar-dados-sessao";

interface ModalVisualizarDataProps {
  id: number;
  isSessao: boolean;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const ModalVisualizarData = ({
  id,
  isSessao,
  children,
  size = "md"
}: ModalVisualizarDataProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-[12px] text-indigo-700 font-bold hover:underline bg-transparent p-0"
      >
        {children}
      </button>

      {open && (
        <Modal onFechar={handleClose} tamanho={size}>
          {isSessao ? (
            
             <VisualizarSessao id={id} />
          ) : (
            <VisualizarPauta id={id} />
          )}
        </Modal>
      )}
    </>
  );
};

export default ModalVisualizarData;

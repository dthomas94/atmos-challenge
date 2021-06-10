import { FC, ReactNode } from "react";
import ReactModal from "react-modal";

interface ModalProps extends ReactModal.Props {
  onCloseModal: () => void;
  children: ReactNode;
}

ReactModal.setAppElement("#root");

export const Modal: FC<ModalProps> = ({
  isOpen,
  onCloseModal,
  children,
  style,
}) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onCloseModal} style={style}>
      {children}
    </ReactModal>
  );
};
